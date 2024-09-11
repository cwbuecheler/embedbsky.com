'use client';

// React and 3rd party libraries
import { FormEvent, useState } from 'react';

// Mantine & related
import { Box, Button, Space, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Local Modules
import Header from '@/components/Header';
import classes from '@/app/page.module.css';
import { api } from '@/util/api';

type FormValues = {
	bskyHandle: string;
};

type Props = {
	handle: string;
};

export default function Home() {
	const [html, setHtml] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [scriptText, setScriptText] = useState<string>('');

	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle: 'cwbuecheler.bsky.social',
		},
		validate: {
			bskyHandle: (value) => {
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	// Display the JS code for the user
	const generateJS = (returnedURI: string) => {
		return (
			'<link rel="stylesheet" href="/embedbsky.com-master.css?v=12" /><div id="embedbsky-com-timeline-embed"></div><script>let containerWidth=600,containerHeight=500;const getHtml=async t=>{const e=await fetch(t);return 200!==e.status?\'<p><strong>No feed data could be located</p></strong>\':e.text()};document.addEventListener(\'DOMContentLoaded\',(async()=>{const t=(new Date).toISOString(),e=document.getElementById(\'embedbsky-com-timeline-embed\');e.style.width=`${containerWidth}px`,e.style.height=`${containerHeight}px`;const n=await getHtml(`' +
			returnedURI +
			'?v=${t}`);e.innerHTML=n}));</script>'
		);
	};

	// Look up the generated HTML (use a version string to ensure no caching)
	const handleJS = async (returnedURI: string) => {
		const d = new Date();
		const t = d.toISOString();

		const htmlResp = await fetch(`${returnedURI}?v=${t}`);
		if (htmlResp.status !== 200) {
			return '<p><strong>No feed data could be located</p></strong>';
		}
		const newHtml = await htmlResp.text();

		// Add the html to state so we can display the timeline at the same time we display the code
		setHtml(newHtml);
	};

	// Handle Form Submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		const values = form.values;
		const resp = await api.createFeed(values.bskyHandle);
		if (!resp.success) {
			notifications.show({
				color: 'red',
				title: 'Error',
				message: `Unfortunately, we couldn't load that timeline. Please try again!`,
			});
			return;
		}
		const returnedURI = resp?.data?.savedFeedURI as string;
		const js = generateJS(returnedURI);
		setScriptText(js);
		setIsLoading(false);
		handleJS(returnedURI);
	};

	// Main component
	const ShowJSComponent: React.FC<Props> = (props) => {
		const { handle } = props;
		return (
			<>
				<link rel="stylesheet" href="/embedbsky.com-master.css" />
				<div
					id="embedbsky-com-timeline-embed"
					dangerouslySetInnerHTML={{ __html: html }}
					style={{
						width: '500px',
						height: '1200px',
						overflowY: 'scroll',
						padding: '10px',
					}}
				></div>
			</>
		);
	};

	return (
		<>
			<Header activeLink="home" />
			<Box mih={600} pl={20} pr={20}>
				<Text>I will make this pretty, but first I will make it work.</Text>
				<Space h="md" />
				<form onSubmit={handleSubmit}>
					<TextInput
						key={form.key('bskyHandle')}
						label="BlueSky Handle"
						placeholder="someone.bksy.social"
						required
						withAsterisk
						{...form.getInputProps('bskyHandle')}
					/>
					<Button type="submit" loading={isLoading}>
						Submit
					</Button>
				</form>
				<Space h="lg" />
				{scriptText ? (
					<>
						<div className={classes.scriptText}>{scriptText}</div>
						<Space h="lg" />
						<Text>Example</Text>
						<Space h="lg" />
						<ShowJSComponent handle={form.values.bskyHandle} />
					</>
				) : null}
			</Box>
		</>
	);
}

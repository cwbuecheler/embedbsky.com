'use client';

// React and 3rd party libraries
import { FormEvent, useEffect, useState } from 'react';

// Mantine & related
import {
	Anchor,
	Box,
	Button,
	Group,
	NumberInput,
	Paper,
	Space,
	Switch,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Local Modules
import Header from '@/components/Header';
import classes from '@/app/page.module.css';
import { api } from '@/util/api';
import Link from 'next/link';

type FormValues = {
	bskyHandle: string;
	darkmode: boolean;
	height: number | null;
	width: number | null;
};

type ShowJSProps = {
	embedHTML: string;
};

export default function Home() {
	const [html, setHtml] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [scriptText, setScriptText] = useState<string>('');

	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle: '',
			darkmode: false,
			height: null,
			width: null,
		},
		validate: {
			bskyHandle: (value) => {
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	// Display the JS code for the user
	const generateJS = (
		returnedURI: string,
		width: number | null,
		height: number | null,
		darkmode: boolean,
	) => {
		let w = width ? width : 550;
		let h = height ? height : 600;
		let js = '<link rel="stylesheet" href="https://embedbsky.com/embedbsky.com-master-min.css" />';
		js += `<div id="embedbsky-com-timeline-embed"${darkmode ? ' class="darkmode"' : ''}></div>`;
		js += '<script>';
		js += `let containerWidth=${w},containerHeight=${h};`;
		js += 'const getHtml=async t=>{';
		js += `const e=await fetch(t);`;
		js += `return 200!==e.status?'<p><strong>No feed data could be located</p></strong>':e.text()`;
		js += '};';
		js += `document.addEventListener('DOMContentLoaded',(async()=>{`;
		js += `const t=(new Date).toISOString(),e=document.getElementById('embedbsky-com-timeline-embed');`;
		js += 'e.style.width=`${containerWidth}px`,e.style.height=`${containerHeight}px`;';
		js += 'const n=await getHtml(`' + returnedURI + '?v=${t}`);';
		js += 'e.innerHTML=n';
		js += '}));';
		js += '</script>';
		return js;
	};

	const handleCodeFocus = (event: React.FocusEvent<HTMLTextAreaElement, Element>) =>
		event.target.select();

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
		setScriptText('');
		const values = form.values;
		const resp = await api.createFeed(values.bskyHandle);
		if (!resp.success) {
			setIsLoading(false);
			showError();
			return;
		}
		const returnedURI = resp?.data?.savedFeedURI as string;
		if (!returnedURI) {
			setIsLoading(false);
			showError();
			return;
		}
		const js = generateJS(returnedURI, values.width, values.height, values.darkmode);
		setScriptText(js);
		handleJS(returnedURI);
		setIsLoading(false);
	};

	// Error message
	const showError = (txt?: string) => {
		let message;
		if (txt) {
			message = txt;
		} else {
			message = `Unfortunately, we couldn't load that timeline. Please try again!`;
		}
		notifications.show({
			color: 'red',
			title: 'Error',
			message,
		});
	};

	// Display Component
	const Example: React.FC<ShowJSProps> = (props) => {
		const { embedHTML } = props;
		const classNames = `${classes.embedexample} ${
			form.values.darkmode ? `${classes.darkmode} darkmode` : ''
		}`;
		return (
			<>
				{/* eslint-disable-next-line */}
				<link rel="stylesheet" href="/embedbsky.com-master.css" />
				<div
					className={classNames}
					dangerouslySetInnerHTML={{ __html: embedHTML }}
					id="embedbsky-com-timeline-embed"
				></div>
			</>
		);
	};

	return (
		<>
			<Header activeLink="home" />
			<Box mih={600} pl={20} pr={20}>
				<form onSubmit={handleSubmit}>
					<Title mb={20} order={1}>
						Embed My BlueSky Timeline
					</Title>
					<Space h="lg" />
					<Text size="lg">
						Are you looking for a way to embed the last thirty posts and reposts from your BlueSky
						timeline in your blog or website? Well, look no further! Just fill in the form below and
						then paste the generated code into your site&apos;s HTML, and you&apos;ll get exactly
						that. Note that once timelines are generated, they update about every five minutes, so
						if you don&apos;t see a post immediately, wait a few and then check the timeline again.
						Questions? Check out the{' '}
						<Link href="/faq" passHref legacyBehavior>
							<Anchor>FAQ</Anchor>
						</Link>
						.
					</Text>
					<Paper className={classes.formwrap} p="xl" shadow="sm">
						<TextInput
							key={form.key('bskyHandle')}
							label="BlueSky Handle"
							placeholder="someone.bksy.social"
							required
							withAsterisk
							{...form.getInputProps('bskyHandle')}
						/>
						<Space h="lg" />
						<NumberInput
							key={form.key('width')}
							label="Embed Width (px)"
							placeholder="defaults to 550"
							{...form.getInputProps('width')}
						/>
						<Space h="lg" />
						<NumberInput
							key={form.key('height')}
							label="Embed Height (px)"
							placeholder="defaults to 600"
							width={200}
							{...form.getInputProps('height')}
						/>
						<Space h="lg" />
						<Switch label="Enable Dark Mode" {...form.getInputProps('darkmode')} />
						<Space h="sm" />
						<Text size="xs">
							Note: this will change the example dynamically but you must resubmit to change the
							embed code
						</Text>
						<Space h="lg" />
						<Button type="submit" loading={isLoading}>
							Submit
						</Button>
					</Paper>
				</form>
				<Space h="lg" />
				{scriptText ? (
					<Group align="top" gap="xl" wrap="nowrap">
						<div style={{ width: 550 }}>
							<Title>Example</Title>
							<Space h="lg" />
							<Example embedHTML={html} />
						</div>
						<div className={classes.codecontainer}>
							<Title>Embed Code</Title>
							<Space h="lg" />
							<Text size="lg">Copy and paste this code into your HTML to embed your timeline.</Text>
							<Space h="lg" />
							<div className={classes.scriptText}>
								<textarea
									className={classes.embedcode}
									onFocus={handleCodeFocus}
									defaultValue={scriptText}
								></textarea>
							</div>
						</div>
					</Group>
				) : (
					<Text ta="center">(click the submit button to see something)</Text>
				)}
			</Box>
		</>
	);
}

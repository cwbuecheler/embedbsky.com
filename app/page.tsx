'use client';

// React and 3rd party libraries
import { FormEvent, useState } from 'react';
import Link from 'next/link';

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
import ColorPickers, { darkModeColors, lightModeColors } from '@/components/ColorPickers';
import classes from '@/app/page.module.css';
import { api } from '@/util/api';

// TS Types
import { ColorList, FormValues } from '@/types/data';
import generateCustomCSS from '@/util/generatecustomcss';

type ShowJSProps = {
	embedHTML: string;
};

export default function Home() {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [scriptText, setScriptText] = useState<string>('');
	const [showColors, setShowColors] = useState<boolean>(false);

	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle: '',
			colors: lightModeColors,
			height: null,
			width: null,
		},
		validate: {
			bskyHandle: (value) => {
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	// Create styles for use in generated code and example (used w/ custom colors)
	const createStyles = (): ColorList => {
		const styles = {
			background: form.values.colors.background,
			border: form.values.colors.border,
			counts: form.values.colors.counts,
			text: form.values.colors.text,
			link: form.values.colors.link,
			linkHover: form.values.colors.linkHover,
			linkHandleHover: form.values.colors.linkHandleHover,
			linkHandle: form.values.colors.linkHandle,
			linkNameHover: form.values.colors.linkNameHover,
			linkName: form.values.colors.linkName,
			linkTimestamp: form.values.colors.linkTimestamp,
			linkTimestampHover: form.values.colors.linkTimestampHover,
			linkLinkCard: form.values.colors.linkLinkCard,
			linkLinkCardHover: form.values.colors.linkLinkCardHover,
			repostHeader: form.values.colors.repostHeader,
		};
		return styles;
	};

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
		// handle custom colors
		if (showColors) {
			js += '<style type="text/css">';
			js += generateCustomCSS(createStyles());
			js += `</style>`;
			js += `<div id="embedbsky-com-timeline-embed"></div>`;
		} else {
			js += `<div id="embedbsky-com-timeline-embed"${darkmode ? ' class="darkmode"' : ''}></div>`;
		}
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
		let newHtml = await htmlResp.text();

		// Add the html to state so we can display the timeline at the same time we display the code
		setHtml(newHtml);
	};

	// Handle darkmode
	const handleSetDarkmode = () => {
		if (darkmode) {
			form.values.colors = lightModeColors;
		} else {
			form.values.colors = darkModeColors;
		}

		setDarkmode(!darkmode);
	};

	// Handle show colors
	const handleSetShowColors = () => {
		setShowColors(!showColors);
	};

	// Handle Form Submission
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setScriptText('');
		const values = form.values;

		// See if they put a full handle or just a single word. If the latter, add ".bsky.social"
		let handle = form.values.bskyHandle;
		if (!handle.includes('.')) {
			handle += '.bsky.social';
		}

		const resp = await api.createFeed(handle);
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
		const js = generateJS(returnedURI, values.width, values.height, darkmode);
		console.log(js);
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
		const classNames = `${classes.embedexample} ${darkmode ? `${classes.darkmode} darkmode` : ''}`;
		return (
			<>
				<link rel="stylesheet" href="/embedbsky.com-master.css" />
				{showColors ? <style type="text/css">{generateCustomCSS(createStyles())}</style> : null}
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
					<Space h="lg" />
					<Text size="lg">
						We&apos;re very much in beta. If you find issues, let me know, or feel free to{' '}
						<Anchor href="https://github.com/cwbuecheler/embedbsky.com/issues" target="_blank">
							submit them on Github
						</Anchor>
					</Text>
					<Space h="lg" />
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
							allowDecimal={false}
							allowLeadingZeros={false}
							allowNegative={false}
							key={form.key('width')}
							label="Embed Width (px)"
							min={200}
							max={2000}
							maxLength={4}
							placeholder="min 200, max 2000, defaults to 550"
							{...form.getInputProps('width')}
						/>
						<Space h="lg" />
						<NumberInput
							allowDecimal={false}
							allowLeadingZeros={false}
							allowNegative={false}
							key={form.key('height')}
							label="Embed Height (px)"
							min={200}
							max={2000}
							maxLength={4}
							placeholder="min 200, max 2000, defaults to 600"
							{...form.getInputProps('height')}
						/>
						<Space h="lg" />
						<Switch
							label="Enable Dark Mode"
							disabled={showColors}
							checked={darkmode}
							onChange={handleSetDarkmode}
						/>
						<Space h="sm" />
						<Text size="xs">
							Note: this will change the example dynamically but you must resubmit to change the
							embed code. Also, if you have custom colors set, this will overwrite them.
						</Text>
						<Space h="lg" />
						<Switch label="Set My Own Colors" checked={showColors} onChange={handleSetShowColors} />
						<Text size="xs">
							Note: this significantly lengthens the embed code. It will also change the example
							dynamically but you must resubmit to change the embed code.
						</Text>
						<Space h="lg" />
						{showColors ? (
							<Box>
								<Title order={3}>Colors</Title>
								<Space h="sm" />
								<ColorPickers darkmode={darkmode} form={form} />
							</Box>
						) : null}
						<Space h="sm" />
						<Button type="submit" loading={isLoading}>
							Get My Code
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
									defaultValue={scriptText}
									onFocus={handleCodeFocus}
									spellCheck={false}
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

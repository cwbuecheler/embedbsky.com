'use client';

// React & 3rd Party Libraries
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// Mantine & Related
import { Anchor, Box, Group, Space, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { notifications, showNotification } from '@mantine/notifications';

// Local Modules
import Header from '@/components/Header';
import LoginBox from '@/components/LoginBox';
import SubmissionForm from '@/components/SubmissionForm';
import TimelineExample from '@/components/TimelineExample';
import classes from '@/app/page.module.css';
import { darkModeColors, lightModeColors } from '@/components/ColorPickers';
import { api } from '@/util/api';
import { createStyles, generateCustomCSS } from '@/util/shared';

// TS Types
import { FormValues } from '@/types/data';

// Main Function
// TODO - break this up a bit. It's too long.
export default function Home() {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [hasReadQS, setHasReadQS] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [qCode, setQCode] = useState<string>('');
	const [qISS, setQISS] = useState<string>('');
	const [qState, setQState] = useState<string>('');
	const [scriptText, setScriptText] = useState<string>('');
	const [showColors, setShowColors] = useState<boolean>(false);

	// Localstorage for DID & handle (so they don't have to type it twice)
	const [did, setDID] = useLocalStorage({ key: 'did', defaultValue: '' });
	const [lsHandle, setLSHandle] = useLocalStorage({ key: 'bskyHandle', defaultValue: '' });

	// Set up form for getting the feed
	const feedForm = useForm<FormValues>({
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

	// Get querystring info for oauth if it exists and then remove it from the querystring
	const searchParams = useSearchParams();
	const router = useRouter();

	if (!hasReadQS) {
		setHasReadQS(true);
	}

	useEffect(() => {
		if (hasReadQS && !qCode && !qISS && !qState) {
			setQCode(searchParams.get('code') || '');
			setQISS(searchParams.get('iss') || '');
			setQState(searchParams.get('state') || '');
			router.push('/');
		}
	}, [hasReadQS, qCode, qISS, qState, router, searchParams]);

	useEffect(() => {
		const verifyLogin = async () => {
			setIsLoading(true);
			const resp = await api.verifyLogin(qCode, qISS, qState);
			if (resp.success) {
				setIsLoggedIn(true);
				setDID(resp.data.did);
				feedForm.values.bskyHandle = lsHandle;
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		};
		if (!did && hasReadQS && qCode && qISS && qState) {
			verifyLogin();
		}
	}, [did, feedForm.values, hasReadQS, lsHandle, qCode, qISS, qState, setDID]);

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
			js += generateCustomCSS(createStyles(feedForm));
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

	// Handle logging in
	const handleLoginSubmit = async (bskyHandle: string) => {
		setIsLoading(true);
		const resp = await api.login(bskyHandle);
		if (!resp.success) {
			showError(`Couldn't find this user to log them in.`);
			setIsLoading(false);
			return;
		}
		// save the handle in LS so they don't have to enter it twice
		setLSHandle(bskyHandle);
		window.location = resp.data.uri;
	};

	// Handle darkmode
	const handleSetDarkmode = () => {
		if (darkmode) {
			feedForm.values.colors = lightModeColors;
		} else {
			feedForm.values.colors = darkModeColors;
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
		const values = feedForm.values;

		// See if they put a full handle or just a single word. If the latter, add ".bsky.social"
		let handle = feedForm.values.bskyHandle;
		if (!handle.includes('.')) {
			handle += '.bsky.social';
		}

		const resp = await api.createFeed(handle, did);
		if (!resp.success) {
			setIsLoading(false);
			showError();
			return;
		}

		if (resp.success && resp.data === '403') {
			setIsLoading(false);
			showError(resp.error);
			return;
		}

		const returnedURI = resp?.data?.savedFeedURI as string;
		if (!returnedURI) {
			setIsLoading(false);
			showError();
			return;
		}
		const js = generateJS(returnedURI, values.width, values.height, darkmode);
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
			autoClose: 8000,
			color: 'red',
			title: 'Error',
			message,
			position: 'top-center',
		});
	};

	return (
		<>
			<Header activeLink="home" />
			<Box mih={600} pl={20} pr={20}>
				<Title mb={20} order={1}>
					Embed My BlueSky Timeline
				</Title>
				<Space h="lg" />
				<Text size="lg">
					Are you looking for a way to embed the last thirty posts and reposts from your BlueSky
					timeline in your blog or website? Well, look no further! Just fill in the form below and
					then paste the generated code into your site&apos;s HTML, and you&apos;ll get exactly
					that. Note that once timelines are generated, they update about every five minutes, so if
					you don&apos;t see a post immediately, wait a few and then check the timeline again.
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
				{isLoggedIn ? (
					<SubmissionForm
						darkmode={darkmode}
						form={feedForm}
						handleSetDarkmode={handleSetDarkmode}
						handleSetShowColors={handleSetShowColors}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
						showColors={showColors}
					/>
				) : (
					<LoginBox handleLoginSubmit={handleLoginSubmit} isLoading={isLoading} />
				)}
				<Space h="lg" />
				{scriptText ? (
					<Group align="top" gap="xl" wrap="nowrap">
						<div style={{ width: 550 }}>
							<Title>Example</Title>
							<Space h="lg" />
							<TimelineExample
								darkmode={darkmode}
								embedHTML={html}
								form={feedForm}
								showColors={showColors}
							/>
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
					<Text ta="center">(log in and fill out the form to see something)</Text>
				)}
			</Box>
		</>
	);
}

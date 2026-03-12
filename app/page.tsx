'use client';

// React & 3rd Party Libraries
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// Mantine & Related
import { Anchor, Box, Group, List, Loader, Space, Text, Title } from '@mantine/core';
import { useInterval, useLocalStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

// Local Modules
import Header from '@/components/Header';
import LoginBox from '@/components/LoginBox';
import SubmissionForm from '@/components/SubmissionForm';
import TimelineExample from '@/components/TimelineExample';
import { lightModeColors } from '@/components/ColorPickers';
import classes from '@/app/page.module.css';
import { api } from '@/util/api';
import { generateJS } from '@/util/generators';

// TS Types
import { ColorList, FormValues } from '@/types/data';
import BuyMeACoffee from '@/components/BuyMeACoffee';

// Main Function
export default function Home() {
	const [darkmode, setDarkmode] = useState<boolean>(false);
	const [did, setDID] = useState<string>('');
	const [enableFooter, setEnableFooter] = useState<boolean>(true);
	const [hasReadQS, setHasReadQS] = useState<boolean>(false);
	const [html, setHtml] = useState<string>('');
	const [includeReposts, setIncludeReposts] = useState<boolean>(true);
	const [hasMounted, setHasMounted] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isRestoringSession, setIsRestoringSession] = useState<boolean>(false);
	const [qCode, setQCode] = useState<string>('');
	const [qISS, setQISS] = useState<string>('');
	const [qState, setQState] = useState<string>('');
	const [colors, setColors] = useState<ColorList | undefined>(undefined);
	const [feedHeight, setFeedHeight] = useState<number | null>(null);
	const [feedURI, setFeedURI] = useState<string>('');
	const [feedWidth, setFeedWidth] = useState<number | null>(null);
	const [showColors, setShowColors] = useState<boolean>(false);

	const scriptText = useMemo(
		() =>
			feedURI
				? generateJS(feedURI, feedWidth, feedHeight, darkmode, enableFooter, showColors, colors)
				: '',
		[colors, darkmode, enableFooter, feedHeight, feedURI, feedWidth, showColors],
	);

	// Localstorage for handle (so they don't have to type it twice)
	const [lsHandle, setLSHandle] = useLocalStorage({ key: 'bskyHandle', defaultValue: '' });

	// Localstorage for custom colors (so they persist across sessions)
	const [lsColors, setLSColors] = useLocalStorage<ColorList | null>({
		key: 'customColors',
		defaultValue: null,
	});

	// Localstorage for DID (so the session can be restored on page reload)
	const [, setLSDID] = useLocalStorage({ key: 'bskyDID', defaultValue: '' });

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
		}
	}, [hasReadQS, qCode, qISS, qState, router, searchParams]);

	useEffect(() => {
		if (did && hasReadQS && qCode && qISS && qState) {
			router.push('/');
		}
	}, [did, hasReadQS, qCode, qISS, qState, router]);

	useEffect(() => {
		const verifyLogin = async () => {
			setIsLoading(true);
			const resp = await api.verifyLogin(qCode, qISS, qState);
			if (resp.success) {
				setIsLoggedIn(true);
				setDID(resp.data.did);
				setLSDID(resp.data.did);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		};
		if (!did && hasReadQS && qCode && qISS && qState) {
			verifyLogin();
		}
	}, [did, hasReadQS, qCode, qISS, qState, setDID, setLSDID]);

	// Before the first paint, hide the login box if a stored DID exists so it
	// doesn't flash before the async restore completes. Skipped during OAuth
	// callbacks so the loading state renders correctly.
	useLayoutEffect(() => {
		if (searchParams.get('code')) return;
		try {
			const storedDID = JSON.parse(window.localStorage.getItem('bskyDID') || 'null') || '';
			if (storedDID) setIsRestoringSession(true);
		} catch {
			// ignore malformed value
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Restore session from a previous visit if no OAuth callback is in progress.
	// Reads localStorage directly to avoid Mantine's two-pass hydration delay.
	useEffect(() => {
		let storedDID = '';
		try {
			storedDID = JSON.parse(window.localStorage.getItem('bskyDID') || 'null') || '';
		} catch {
			// malformed value, ignore
		}

		if (!storedDID || searchParams.get('code')) {
			setIsRestoringSession(false);
			return;
		}

		const restoreSession = async () => {
			const resp = await api.refreshSession(storedDID);
			if (resp.success) {
				setDID(storedDID);
				setLSDID(storedDID);
				setIsLoggedIn(true);
			} else {
				setLSDID('');
			}
			setIsRestoringSession(false);
		};
		restoreSession();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Background token refresh every 45 minutes
	const sessionRefreshInterval = useInterval(
		async () => {
			if (!did) return;
			const resp = await api.refreshSession(did);
			if (!resp.success) {
				sessionRefreshInterval.stop();
				setIsLoggedIn(false);
				setDID('');
				setLSDID('');
				showError('Your session has expired. Please log in again.');
			}
		},
		45 * 60 * 1000,
	);

	useEffect(() => {
		if (isLoggedIn) {
			sessionRefreshInterval.start();
		} else {
			sessionRefreshInterval.stop();
		}
		return () => sessionRefreshInterval.stop();
	}, [isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		setHasMounted(true);
	}, []);

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

	// Handle logout
	const handleLogout = () => {
		setIsLoggedIn(false);
		setDID('');
		setLSDID('');
	};

	// Handle darkmode
	const handleSetDarkmode = () => {
		setDarkmode(!darkmode);
	};

	//  Handle enabling footer
	const handleSetEnableFooter = () => {
		setEnableFooter(!enableFooter);
	};

	// Handle including reposts
	const handleSetIncludeReposts = () => {
		setIncludeReposts(!includeReposts);
	};

	// Handle show colors
	const handleSetShowColors = () => {
		setShowColors(!showColors);
	};

	// Handle Form Submission
	const handleSubmit = async (formValues: FormValues) => {
		setIsLoading(true);
		setFeedURI('');

		// Trim whitespace from the handle (happens on paste sometimes and can cause issues)
		formValues.bskyHandle = formValues.bskyHandle.trim();

		// See if they put a full handle or just a single word. If the latter, add ".bsky.social"
		let handle = formValues.bskyHandle;
		if (!handle.includes('.')) {
			handle += '.bsky.social';
		}
		const { limit } = formValues;

		const resp = await api.createFeed(handle, did, formValues.enableFooter, includeReposts, limit);
		if (!resp.success) {
			setIsLoading(false);
			if (resp.data === '401') {
				setIsLoggedIn(false);
				setDID('');
				setLSDID('');
				showError('Your session has expired. Please log in again.');
				return;
			}
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
		setFeedHeight(formValues.height);
		setFeedURI(returnedURI);
		setFeedWidth(formValues.width);
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
			<Header activeLink="home" isLoggedIn={isLoggedIn} onLogout={handleLogout} />
			<Box mih={600} pl={20} pr={20}>
				<Title mb={20} order={1}>
					Embed My BlueSky Timeline
				</Title>
				<List type="unordered" size="lg">
					<List.Item>
						Embed your BlueSky timeline in your blog or website (up to 30 posts/reposts)
					</List.Item>
					<List.Item>
						Customize the width, height, and colors (includes dark mode support)
					</List.Item>
					<List.Item>Embed code is generated for you and updated every 5 minutes</List.Item>
					<List.Item>
						Embed code is valid HTML, CSS, and Vanilla JS - just paste it into your site
					</List.Item>
					<List.Item>No backend or BlueSky server calls required!</List.Item>
					<List.Item>Open source and free to use</List.Item>
					<List.Item>
						Check out the{' '}
						<Link href="/faq" passHref legacyBehavior>
							<Anchor>FAQ</Anchor>
						</Link>{' '}
						for more information
					</List.Item>
				</List>
				<Space h="lg" />
				<Box content="center" mb="lg" display="flex">
					<Text size="lg">Want to help me keep EmbedBsky running?</Text> <BuyMeACoffee />
				</Box>
				<Space h="lg" />
				{isLoggedIn ? (
					<SubmissionForm
						bskyHandle={lsHandle}
						darkmode={darkmode}
						enableFooter={enableFooter}
						handleSetDarkmode={handleSetDarkmode}
						handleSetEnableFooter={handleSetEnableFooter}
						handleSetIncludeReposts={handleSetIncludeReposts}
						handleSetShowColors={handleSetShowColors}
						initialColors={lsColors ?? lightModeColors}
						includeReposts={includeReposts}
						isLoading={isLoading}
						persistColors={(colors) => setLSColors(colors)}
						setColors={setColors}
						showColors={showColors}
						submitForm={handleSubmit}
					/>
				) : !hasMounted || isRestoringSession ? (
					<div style={{ textAlign: 'center' }}>
						<Loader c="primary" />
					</div>
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
								colors={colors}
								darkmode={darkmode}
								enableFooter={enableFooter}
								embedHTML={html}
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
									readOnly
									value={scriptText}
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

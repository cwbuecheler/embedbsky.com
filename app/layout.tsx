// React & 3rd Party Libraries
import type { Metadata } from 'next';

// Mantine and Related
import { Container, Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import theme from '@/theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// Local Modules
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'EmbedBsky.com',
	description: 'Embed Your BlueSky timeline on any website or blog with a few lines of code.',
	applicationName: 'Embed Bsky',
	authors: [{ name: 'Christopher Buecheler', url: 'https://bsky.app/profile/cwbuecheler.com' }],
	generator: 'Next.js',
	keywords: [
		'BlueSky',
		'Blue Sky',
		'Bsky',
		'Embed',
		'Timeline',
		'Embeddable',
		'Insert',
		'Website',
		'Site',
		'Blog',
	],
	openGraph: {
		type: 'website',
		url: 'https://embedbsky.com',
		title: 'Embed Bsky',
		description: 'Embed Your BlueSky timeline on any website or blog with a few lines of code.',
		siteName: 'Embed Bsky',
		images: [
			{
				url: 'https://embedbsky.com/embed_bsky_og.png',
				width: 800,
				height: 600,
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<MantineProvider theme={theme}>
					<Notifications />
					<Container>
						<Suspense fallback={<Loader />}>{children}</Suspense>
						<Footer />
					</Container>
				</MantineProvider>
			</body>
		</html>
	);
}

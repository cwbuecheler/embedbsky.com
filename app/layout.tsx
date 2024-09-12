import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

// React, Next, Etc.
import type { Metadata } from 'next';

// Mantine and related
import { Container, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import theme from '@/theme';

// Local
import Footer from '@/components/Footer';

export const metadata: Metadata = {
	title: 'EmbedBsky.com',
	description: 'Embed your BlueSky timeline on any site with simple JavaScript code',
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
						{children}
						<Footer />
					</Container>
				</MantineProvider>
			</body>
		</html>
	);
}

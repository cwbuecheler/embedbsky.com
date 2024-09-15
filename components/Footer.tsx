'use client';

// React & 3rd Party Libraries
import Link from 'next/link';

// Mantine & Related
import { Anchor, Container, Group, Text } from '@mantine/core';

// Local Modules
import classes from './Footer.module.css';

const links = [
	{ link: '/', label: 'Home' },
	{ link: '/faq/', label: 'FAQ' },
	{ link: '/terms/', label: 'Terms' },
	{ link: '/privacy/', label: 'Privacy' },
];

const Footer = () => {
	const items = links.map((link) => (
		<Link key={link.label} href={link.link} legacyBehavior passHref>
			<Anchor c="dimmed" size="sm">
				{link.label}
			</Anchor>
		</Link>
	));

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Group>
					<Text>
						&copy; 2024{' '}
						<Anchor href="https://bsky.app/profile/cwbuecheler.bsky.social" target="_blank">
							Christopher Buecheler
						</Anchor>
					</Text>
				</Group>
				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
};
export default Footer;

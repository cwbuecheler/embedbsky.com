'use client';

import { Anchor, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';

const links = [
	{ link: '/', label: 'Home' },
	{ link: '/faq/', label: 'FAQ' },
	{ link: '/terms/', label: 'Terms' },
	{ link: '/privacy/', label: 'Privacy' },
];

const Footer = () => {
	const items = links.map((link) => (
		<Anchor<'a'>
			c="dimmed"
			key={link.label}
			href={link.link}
			onClick={(event) => event.preventDefault()}
			size="sm"
		>
			{link.label}
		</Anchor>
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

'use client';

import { Container, Group, Anchor } from '@mantine/core';
import classes from './Footer.module.css';

const links = [
	{ link: '/', label: 'Home' },
	{ link: '/faq', label: 'Questions?' },
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
					&copy; 2024{' '}
					<Anchor href="https://bsky.app/profile/cwbuecheler.bsky.social">
						Christopher Buecheler
					</Anchor>
				</Group>
				<Group className={classes.links}>{items}</Group>
			</Container>
		</div>
	);
};
export default Footer;

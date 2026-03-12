'use client';

// React & 3rd Party Libraries
import { useState } from 'react';
import Link from 'next/link';

// Mantine & Related
import { ActionIcon, Burger, Button, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';
import classes from './Header.module.css';

type Link = {
	label: string;
	link: string;
};

type Links = {
	[key: string]: Link;
	home: Link;
	faq: Link;
	patchnotes: Link;
};

type Props = {
	activeLink: string;
	isLoggedIn?: boolean;
	onLogout?: () => void;
};

const links: Links = {
	home: {
		label: 'Home',
		link: '/',
	},
	faq: {
		label: 'Questions?',
		link: '/faq',
	},
	patchnotes: {
		label: 'Patch Notes',
		link: '/patchnotes',
	},
};

const Header: React.FC<Props> = (props) => {
	const { activeLink, isLoggedIn, onLogout } = props;

	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[activeLink].link);

	const linksArray = [];
	for (const key of Object.keys(links)) {
		const obj = {
			label: links[key].label,
			link: links[key].link,
		};
		linksArray.push(obj);
	}

	const items = linksArray.map((link) => (
		<Link
			key={link.label}
			href={link.link}
			className={classes.link}
			data-active={active === link.link || undefined}
		>
			{link.label}
		</Link>
	));

	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<span>
					<Link className={classes.logolink} href="/">
						Embed Bsky
						<Image alt="EmbedBsky.com Logo" className={classes.logo} src="/embedbsky_logo.svg" />
					</Link>
				</span>
				<Group gap={5} visibleFrom="xs">
					{items}
					{isLoggedIn && (
						<Button ml={4} onClick={onLogout} size="xs" variant="outline">
							Log Out
						</Button>
					)}
				</Group>
				<Group gap={8} hiddenFrom="xs">
					{isLoggedIn && (
						<ActionIcon aria-label="Log out" onClick={onLogout} size="sm" variant="outline">
							<IconLogout size={14} />
						</ActionIcon>
					)}
					<Burger opened={opened} onClick={toggle} size="sm" />
				</Group>
			</Container>
		</header>
	);
};

export default Header;

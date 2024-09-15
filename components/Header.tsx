'use client';

// React & 3rd Party Libraries
import { useState } from 'react';
import Link from 'next/link';

// Mantine & Related
import { Burger, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

type Link = {
	label: string;
	link: string;
};

type Links = {
	[key: string]: Link;
	home: Link;
	faq: Link;
};

type Props = {
	activeLink: string;
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
};

const Header: React.FC<Props> = (props) => {
	const { activeLink } = props;

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
				</Group>
				<Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
			</Container>
		</header>
	);
};

export default Header;

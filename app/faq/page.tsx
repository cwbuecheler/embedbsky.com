// Mantine & related
import { Anchor, Box, Text, Title } from '@mantine/core';

// Local Modules
import Header from '@/components/Header';

export default function FAQ() {
	return (
		<>
			<Header activeLink="faq" />
			<Box pl={20} pr={20}>
				<Title mb={20} order={1}>
					FAQ
				</Title>
				<Title mb={10} order={2}>
					What is this?
				</Title>
				<Text mb={20} size="lg">
					It&apos;s a simple application that allows a user to embed a BlueSky timeline in their
					website, similar to what you can do with other social media sites. We store some timeline
					html in a CDN, and then we give you a script to embed on your site. That script reaches
					out, snags the appropriate HTML, and formats it so it looks pretty.
				</Text>
				<Title mb={10} order={2}>
					Who Made It?
				</Title>
				<Text mb={20} size="lg">
					I&apos;m{' '}
					<Anchor href="https://closebrace.com/" target="_blank">
						Christopher Buecheler
					</Anchor>
					, a full-stack web developer who works primarily in TypeScript. You should absolutely{' '}
					<Anchor href="https://bsky.app/profile/cwbuecheler.bsky.social" target="_blank">
						follow me on BlueSky
					</Anchor>
					!
				</Text>
				<Title mb={10} order={2}>
					Why?
				</Title>
				<Text mb={20} size="lg">
					I love BlueSky, I wanted to get a bit more familiar with the @ protocol, I thought
					it&apos;d be fun to create something open source, I wanted a portfolio piece, I was bored
					on a weekend &hellip; whole bunch of reasons!
				</Text>
				<Title mb={10} order={2}>
					How do I use it?
				</Title>
				<Text mb={20} size="lg">
					Just follow the directions on the home page!
				</Text>
				<Title mb={10} order={2}>
					Didn&apos;t someone else already do this?
				</Title>
				<Text mb={20} size="lg">
					Sure. Someone also made cars before Hyundai did it, but that didn&apos;t stop them. My
					approach is different from existing approaches for a few of reasons. The first is that I
					wanted something that would display something even if the BlueSky API temporarily went
					down (AWS is less likely to encounter such issues). The second is I wanted to be able to
					generate custom CSS on a per-user basis so that only power users need tinker with the code
					to make visual changes. The third is that I wanted to work exclusively in vanilla JS / CS
					(well, okay, I worked in TypeScript and React, but the output is intentionally and
					explicitly vanilla - no 3rd party libraries needed, not even AtProto). The fourth is that
					I wanted to teach myself some stuff about generating and serving static content from
					CloudFront.
				</Text>
				<Title mb={10} order={2}>
					Can I contribute?
				</Title>
				<Text mb={20} size="lg">
					Sure! The whole thing&apos;s open source. Here&apos;s the front-end repo, and here&apos;s
					the back-end repo.
				</Text>
				<Title mb={10} order={2}>
					Can I advertise on your website and/or in people&apos;s timelines?
				</Title>
				<Text mb={20} size="lg">
					What? No. Go away!
				</Text>
				<Title mb={10} order={2}>
					Can I compensate you in some way?
				</Title>
				<Text mb={20} size="lg">
					You could hire me to consult for your startup, SaaS business, or the like. Or you could
					kick five bucks my way via Kofi. Or you could give me props on LinkedIn or something.
					I&apos;m not picky, but I&apos;m definitely appreciative! Also, as previously mentioned,
					you should{' '}
					<Anchor href="https://bsky.app/profile/cwbuecheler.bsky.social" target="_blank">
						follow me on BlueSky
					</Anchor>
					. Everyone loves to see that follower count increase.
				</Text>
				<Title mb={10} order={2}>
					Are you storing my timeline data for nefarious purposes?
				</Title>
				<Text mb={20} size="lg">
					The only thing that gets stored, and you can verify this by perusing the source code
					mentioned above, is your BlueSky ID and a flat HTML file containing your last thirty
					BlueSky posts (including reposts and quote posts). Frankly, much more of your timeline
					data is available via web search than via this app.
				</Text>
				<Title mb={10} order={2}>
					Nonetheless, I&apos;d like to delete my data
				</Title>
				<Text mb={20} size="lg">
					You have two options. The first is to delete your BlueSky account. The system
					automatically nukes any data from nonexistent accounts. If you&apos;d prefer not to pursue
					the nuclear option, you can get in touch with me and I can manually remove you. Once I get
					AtProto oauth working, you&apos;ll be able to do it yourself, but they haven&apos;t even
					rolled that out yet, and I don&apos;t want to make a &ldquo;delete feed&rdquo; function
					because someone could use it maliciously to delete someone else&apos;s feed.
				</Text>
				<Text mb={20} size="lg">
					Please keep in mind, however, that anyone can access a feed, and thus create an embed, if
					they know someone&apos;s BlueSky handle &hellip; which is prominently displayed on
					everyone&apos;s BlueSky timeline. It&apos;s public info on the web.
				</Text>
				<Title mb={10} order={2}>
					Why didn&apos;t you use [technology that I particularly like]?
				</Title>
				<Text mb={20} size="lg">
					Well, there&apos;s like a hundred million ways to approach building a web app and no
					one&apos;s going to make the exact same choices. I chose tech and approaches I am familiar
					with, enjoy working with, etc. You may notice for example that there&apos;s no CSS
					framework. There are two reason for that: first, unlike a lot of programmers, I{' '}
					<em>like</em> CSS. I think the cascade is very much a feature, and not a bug, and that
					when used elegantly and well it kicks the butt off just about any CSS framework out there,
					especially CSS-in-JS solutions, which are clunky and defeat the whole purpose of the
					language. Beyond that, I want people to be able to easily customize their timelines, so
					using vanilla CSS allows for the fewest barriers between them and making those changes.
					That&apos;s just an example of one of countless tech choices I made while putting this
					whole thing together.
				</Text>
				<Title mb={10} order={2}>
					I have a question not answered in this FAQ
				</Title>
				<Text mb={20} size="lg">
					I guess I must not get it that frequently, then! Feel free to contact me and I&apos;ll do
					my best to answer it.
				</Text>
			</Box>
		</>
	);
}

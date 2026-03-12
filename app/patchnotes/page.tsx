'use client';

// Mantine & Related
import { Box, List, Title } from '@mantine/core';

// Local Modules
import Header from '@/components/Header';

export default function PatchNotes() {
	return (
		<>
			<Header activeLink="patchnotes" />
			<Box pl={20} pr={20}>
				<Title mb={20} order={1}>
					Patch Notes
				</Title>
				<Title mb={10} order={2}>
					Thursday, March 12, 2026
				</Title>
				<List mb={20} size="lg" type="unordered">
					<List.Item mb={10}>
						Improved session handling. You shouldn&rsquo;t get timed out if you spend a while
						editing colors or whatever, and you also shouldn&rsquo;t have to log back in every time
						you open the site in a new tab.
					</List.Item>
					<List.Item mb={10}>
						However, if you <em>do</em> get timed out or logged out for some reason, the site now
						stores your color choices and will restore them when you log back in, so you won&rsquo;t
						lose your custom colors.
					</List.Item>
					<List.Item mb={10}>
						I added a &ldquo;Buy Me a Coffee&rdquo; button. If you like the site and want to help me
						keep it running, that&rsquo;s a great way to do it! It&rsquo;s not required and
						EmbedBsky will be free until such time as the AWS costs get out of control, which
						hasn&rsquo;t happened for a year but I guess we&rsquo;ll see. 😉
					</List.Item>
					<List.Item mb={10}>
						Added the option (defaulted to on for new users) to add a little &ldquo;Powered by
						EmbedBsky&rdquo; badge at the bottom of the feed. Publicity helps, but I also want to be
						respectful of people who would prefer not to have that, so you can turn it off if you
						want.
					</List.Item>
					<List.Item mb={10}>
						That&rsquo;s about it. I&rsquo;ve got a few more things to add in the next week or so,
						but this seems like a good update!
					</List.Item>
				</List>
				<Title mb={10} order={2}>
					Friday, May 9th, 2025
				</Title>
				<List mb={20} size="lg" type="unordered">
					<List.Item mb={10}>
						Restored all feeds to the database that were deleted during the BlueSky outage. 🎉
					</List.Item>
				</List>
				<Title mb={10} order={2}>
					Thursday, May 8th, 2025
				</Title>
				<List mb={20} size="lg" type="unordered">
					<List.Item mb={10}>Added patch notes page. 😉</List.Item>
					<List.Item mb={10}>
						Fixed a significant bug in the back-end that could cause feeds to be permanently deleted
						from the DB if there was a BlueSky outage. Now we log the error, recheck for seven days,
						and if it&rsquo;s still dead after all that time we assume the account is actually gone
						and mark the feed as deleted (but without removing it from the DB).
					</List.Item>
					<List.Item>
						Updated the code to actually remove the feed HTML from the CDN, like our FAQ says we do,
						and which I genuinely thought I&rsquo;d already written code to do. Oops!
					</List.Item>
				</List>
			</Box>
		</>
	);
}

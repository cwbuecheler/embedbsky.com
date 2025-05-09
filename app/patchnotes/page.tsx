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

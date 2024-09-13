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
					Privacy Policy
				</Title>

				<Title mb={20} order={4}>
					Last Update: September 13<sup>th</sup>, 2024
				</Title>

				<Text mb={20} size="lg">
					The very short version: we don&apos;t store anything except your BlueSky handle and
					generated HTML that displays your last thirty posts / reposts. This HTML file is generated
					with a hashed (RSA-256) filename so it can&apos;t be guessed. We do not give or sell your
					information to anyone else, though we do transfer your handle to BlueSky when looking up
					your timeline. We don&apos;t use any cookies or analytical software. We don&apos;t track
					anything you do. We are deeply uninterested in measuring anything about you, your behavior
					on the internet, or what you might be interested in purchasing.
				</Text>

				<Text mb={20} size="sm">
					The text of this Privacy Policy was adapted from that found on BlueSky. BlueSky and its
					affiliated corporate entities are in no way related to Embed Bsky and are not responsible
					for the following privacy policy.
				</Text>

				<Text mb={20} size="lg">
					Embed Bsky&apos;s app is a web application that allows users to embed their BlueSky
					timelines on their website or blog. A summary of our privacy practices for Embed Bsky is
					immediately below. You can read on for more detail.
				</Text>

				<ul>
					<li>
						<strong>Profiles and Posts Are Public</strong>. The Bluesky App is a microblogging
						service for public conversation, so any information you add to your public profile and
						the information you post on the Bluesky App is public. Embed Bsky digests this content,
						and if you embed the code our service produces on your blog or website, all of your
						BlueSky posts will appear there.
					</li>
					<li>
						<strong>Updates. </strong>We may update this Privacy Notice from time to time. We will
						post these changes on Christopher Buecheler&apos;s BlueSky profile. We will never email
						you, because we don&apos;t know your email address.
					</li>
					<li>
						<strong>Personal Information We Collect</strong>. We do not collect any personal
						information from our users except their BlueSky handle.
					</li>
					<li>
						<strong>How We Use Personal Information</strong>. We use your BlueSky handle to generate
						an HTML file that contains the last 30 posts / reposts you made to BlueSky, and to
						regenerate that file every five minutes. The filename for this file is a hashed
						(RSA-256) string of characters that cannot be guessed.
					</li>
					<li>
						<strong>How We Disclose Your Personal Information</strong>. We do not share your BlueSky
						handle with anyone else for any reason.
					</li>
					<li>
						<strong>Your Privacy Rights and Choices</strong>. You may at any time contact
						Christopher Buecheler via BlueSky DM to request that he remove your existing feed and
						handle information from the service. You can also delete your BlueSky account, and the
						service will automatically remove your details.
					</li>
					<li>
						<strong>International Transfers</strong>. Depending on your location, you may
						technically be transfering information internationally when we contact the BlueSky
						servers to look up your timeline.
					</li>
					<li>
						<strong>How Long We Keep Personal Information</strong>. We keep your BlueSky handle and
						timeline HTML until you request that we remove it or delete your BlueSky account, or
						until this site becomes prohibitively expensive and the creator shuts it down.
					</li>
					<li>
						<strong>Supplemental Notices for Certain Jurisdictions</strong>. Certain jurisdictions
						may have additional requirements for our processing of your personal information.
					</li>
					<li>
						<strong>Security.</strong> We make reasonable efforts to protect your information.
					</li>
					<li>
						<strong>Children&apos;s Personal Information</strong>. The Embed Bsky service is not
						directed to children.
					</li>
					<li>
						<strong>Questions</strong>? If you have any questions regarding our privacy practices,
						please contact Christopher Buecheler via BlueSky Direct Message.
					</li>
				</ul>
			</Box>
		</>
	);
}

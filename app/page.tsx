'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button, MantineProvider, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import theme from '@/theme';
import { api } from '@/util/api';
import ReplySvg from '@/components/replySvg';
import RepostSvg from '@/components/RepostSvg';
import LikeSvg from '@/components/likeSvg';
import MoreOptionsSvg from '@/components/MoreOptionsSvg';
import PostItem from '@/components/PostItem';

type FormValues = {
	bskyHandle: string;
};

export default function Home() {
	const [feed, setFeed] = useState<any>(undefined);
	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle: '',
		},

		validate: {
			bskyHandle: (value) => {
				console.log(value);
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const values = form.values;
		const resp = await api.lookupFeed(values.bskyHandle);
		setFeed(resp.data.data.feed);
	};

	const renderPostItems = () =>
		feed.map((item: any) => <PostItem item={item} key={item.post.cid} />);

	useEffect(() => {
		console.log(feed);
	}, [feed]);

	return (
		<MantineProvider theme={theme}>
			<p>I will make this pretty, but first I will make it work.</p>
			<form onSubmit={handleSubmit}>
				<TextInput
					key={form.key('bskyHandle')}
					label="BlueSky Handle"
					placeholder="someone.bksy.social"
					required
					withAsterisk
					{...form.getInputProps('bskyHandle')}
				/>
				<Button type="submit">Submit</Button>
			</form>
			<br />
			<br />
			{feed && renderPostItems()}
		</MantineProvider>
	);
}

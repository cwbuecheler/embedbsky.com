'use client';

// React and 3rd party libraries
import { FormEvent, useEffect, useState } from 'react';

// Mantine & related
import theme from '@/theme';
import { Button, MantineProvider, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

// Local Modules
import PostContainer from '@/components/PostContainer';
import { api } from '@/util/api';

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
			{feed && <PostContainer feed={feed} />}
		</MantineProvider>
	);
}

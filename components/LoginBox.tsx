'use client';

// React and 3rd party libraries
import { FormEvent, useState } from 'react';

// Mantine & related
import { Box, Button, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

// Local Modules
import classes from '@/components/LoginBox.module.css';

type Props = {
	handleLoginSubmit: (bskyHandle: string) => Promise<void>;
	isLoading: boolean;
};

type FormValues = {
	handle: string;
};

const LoginBox: React.FC<Props> = (props) => {
	const { handleLoginSubmit, isLoading } = props;

	const form = useForm<FormValues>({
		initialValues: {
			handle: '',
		},
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleLoginSubmit(form.values.handle);
	};

	return (
		<Paper className={classes.loginbox} p="xl" shadow="sm">
			<Title ta="center" order={2}>
				Log In to BlueSky
			</Title>
			<Space h="md" />
			<Text size="md">This will take you to BlueSky briefly to perform an OAuth log-in.</Text>
			<Space h="lg" />
			<form onSubmit={handleSubmit}>
				<TextInput
					key={form.key('handle')}
					label="BlueSky Handle"
					placeholder="someone.bksy.social"
					required
					withAsterisk
					{...form.getInputProps('handle')}
				/>
				<Space h="lg" />
				<Box ta="center">
					<Button type="submit" loading={isLoading}>
						Log In With BlueSky
					</Button>
				</Box>
			</form>
			<Space h="lg" />
			<Text size="sm">
				All password data is only passed between you and BlueSky. We don&apos;t ever see your
				password, and we don&apos;t store it anywhere.
			</Text>
		</Paper>
	);
};

export default LoginBox;

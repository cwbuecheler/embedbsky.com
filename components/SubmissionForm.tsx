'use client';

// React & 3rd Party Libraries
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useEffect } from 'react';

// Mantine & Related
import {
	Box,
	Button,
	NumberInput,
	Paper,
	Space,
	Switch,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

// Local Modules
import ColorPickers from '@/components/ColorPickers';
import classes from '@/components/SubmissionForm.module.css';

// TS Types
import { ColorList, FormValues } from '@/types/data';

type Props = {
	bskyHandle: string;
	darkmode: boolean;
	enableFooter: boolean;
	handleSetDarkmode: ChangeEventHandler<HTMLInputElement> | undefined;
	handleSetEnableFooter: ChangeEventHandler<HTMLInputElement> | undefined;
	handleSetIncludeReposts: ChangeEventHandler<HTMLInputElement> | undefined;
	handleSetShowColors: ChangeEventHandler<HTMLInputElement> | undefined;
	includeReposts: boolean;
	initialColors: ColorList;
	isLoading: boolean;
	persistColors: (colors: ColorList) => void;
	setColors: Dispatch<SetStateAction<ColorList | undefined>>;
	showColors: boolean;
	submitForm: (feedFormValues: FormValues) => Promise<void>;
};

const SubmissionForm: React.FC<Props> = (props) => {
	const {
		bskyHandle,
		darkmode,
		enableFooter,
		handleSetDarkmode,
		handleSetEnableFooter,
		handleSetIncludeReposts,
		handleSetShowColors,
		includeReposts,
		initialColors,
		isLoading,
		persistColors,
		setColors,
		showColors,
		submitForm,
	} = props;

	// Set up form for getting the feed
	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle,
			colors: initialColors,
			enableFooter: true,
			height: null,
			limit: 30,
			width: null,
		},
		validate: {
			bskyHandle: (value: string) => {
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	// Persist colors to localStorage whenever they change in the picker
	useEffect(() => {
		persistColors(form.values.colors);
	}, [form.values.colors]); // eslint-disable-line react-hooks/exhaustive-deps

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setColors(form.values.colors);
		submitForm(form.values);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<Paper className={classes.formwrap} p="xl" shadow="sm">
				<TextInput
					key={form.key('bskyHandle')}
					label="BlueSky Handle"
					placeholder="someone.bksy.social"
					required
					withAsterisk
					{...form.getInputProps('bskyHandle')}
				/>
				<Space h="lg" />
				<NumberInput
					allowDecimal={false}
					allowLeadingZeros={false}
					allowNegative={false}
					key={form.key('width')}
					label="Embed Width (px)"
					min={200}
					max={2000}
					maxLength={4}
					placeholder="min 200, max 2000, blank for responsive"
					{...form.getInputProps('width')}
				/>
				<Space h="lg" />
				<NumberInput
					allowDecimal={false}
					allowLeadingZeros={false}
					allowNegative={false}
					key={form.key('height')}
					label="Embed Height (px)"
					min={200}
					max={2000}
					maxLength={4}
					placeholder="min 200, max 2000, defaults to 600"
					{...form.getInputProps('height')}
				/>
				<Space h="lg" />
				<NumberInput
					allowDecimal={false}
					allowLeadingZeros={false}
					allowNegative={false}
					key={form.key('limit')}
					label="# of Posts to Show"
					min={1}
					max={30}
					maxLength={2}
					placeholder="min 1, max 30, defaults to 30"
					{...form.getInputProps('limit')}
				/>
				<Space h="lg" />
				<Switch
					label="Include Reposts"
					checked={includeReposts}
					onChange={handleSetIncludeReposts}
				/>
				<Space h="sm" />
				<Text size="xs">
					{includeReposts ? `Show Posts, Reposts, and Quote Posts` : `Show Posts and Quote Posts`}
				</Text>
				<Space h="lg" />
				<Switch
					label="Enable EmbedBsky Footer"
					key={form.key('enableFooter')}
					checked={enableFooter}
					onChange={handleSetEnableFooter}
				/>
				<Space h="sm" />
				<Text size="xs">
					Show a small &quot;Powered by EmbedBsky.com&quot; footer on your embed. This helps the
					site!
				</Text>
				<Space h="lg" />
				<Switch
					label="Enable Dark Mode"
					disabled={showColors}
					checked={darkmode}
					onChange={handleSetDarkmode}
				/>
				<Space h="sm" />
				<Text size="xs">
					Note: this updates both the example and embed code immediately. If you have set custom
					colors, this option is disabled to prevent conflicts.
				</Text>
				<Space h="lg" />
				<Switch label="Set My Own Colors" checked={showColors} onChange={handleSetShowColors} />
				<Text size="xs">
					Note: this significantly lengthens the embed code. You must resubmit to see changes.
				</Text>
				<Space h="lg" />
				{showColors ? (
					<Box>
						<Title order={3}>Colors</Title>
						<Space h="sm" />
						<ColorPickers form={form} />
					</Box>
				) : null}
				<Space h="sm" />
				<Button type="submit" loading={isLoading}>
					Get My Code
				</Button>
			</Paper>
		</form>
	);
};

export default SubmissionForm;

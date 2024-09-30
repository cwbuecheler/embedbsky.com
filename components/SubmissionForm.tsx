'use client';

// React & 3rd Party Libraries
import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from 'react';

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
import ColorPickers, { darkModeColors, lightModeColors } from '@/components/ColorPickers';
import classes from '@/components/SubmissionForm.module.css';

// TS Types
import { ColorList, FormValues } from '@/types/data';

type Props = {
	bskyHandle: string;
	darkmode: boolean;
	handleSetDarkmode: ChangeEventHandler<HTMLInputElement> | undefined;
	handleSetShowColors: ChangeEventHandler<HTMLInputElement> | undefined;
	isLoading: boolean;
	setColors: Dispatch<SetStateAction<ColorList | undefined>>;
	showColors: boolean;
	submitForm: (feedFormValues: FormValues) => Promise<void>;
};

const SubmissionForm: React.FC<Props> = (props) => {
	const {
		bskyHandle,
		darkmode,
		handleSetDarkmode,
		handleSetShowColors,
		isLoading,
		setColors,
		showColors,
		submitForm,
	} = props;

	// Set up form for getting the feed
	const form = useForm<FormValues>({
		initialValues: {
			bskyHandle,
			colors: lightModeColors,
			height: null,
			width: null,
		},
		validate: {
			bskyHandle: (value: string) => {
				return value.length > 6 ? '' : 'Handle must be at least 6 characters long.';
			},
		},
	});

	// Handle darkmode toggle (no useEffect needed - will run each render)
	if (darkmode) {
		form.values.colors = lightModeColors;
	} else {
		form.values.colors = darkModeColors;
	}

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
					placeholder="min 200, max 2000, defaults to 550"
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
				<Switch
					label="Enable Dark Mode"
					disabled={showColors}
					checked={darkmode}
					onChange={handleSetDarkmode}
				/>
				<Space h="sm" />
				<Text size="xs">
					Note: this will change the example dynamically but you must resubmit to change the embed
					code. Also, if you have custom colors set, this will overwrite them.
				</Text>
				<Space h="lg" />
				<Switch label="Set My Own Colors" checked={showColors} onChange={handleSetShowColors} />
				<Text size="xs">
					Note: this significantly lengthens the embed code. It will also change the example
					dynamically but you must resubmit to change the embed code.
				</Text>
				<Space h="lg" />
				{showColors ? (
					<Box>
						<Title order={3}>Colors</Title>
						<Space h="sm" />
						<ColorPickers darkmode={darkmode} form={form} />
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

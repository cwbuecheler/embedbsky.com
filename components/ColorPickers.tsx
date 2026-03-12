// Mantine & Related
import { ColorInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

// TS Types
import { ColorList, ColorObj, FormValues } from '@/types/data';

type Props = {
	form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

const colors = [
	{ label: 'Background', name: 'background' },
	{ label: 'Border', name: 'border' },
	{ label: 'Counts', name: 'counts' },
	{ label: 'Links', name: 'link' },
	{ label: 'Links (hover)', name: 'linkHover' },
	{ label: 'Handle', name: 'linkHandle' },
	{ label: 'Handle (hover)', name: 'linkHandleHover' },
	{ label: 'Link Card Link', name: 'linkLinkCard' },
	{ label: 'Link Card Link (hover)', name: 'linkLinkCardHover' },
	{ label: 'Name', name: 'linkName' },
	{ label: 'Name (hover)', name: 'linkNameHover' },
	{ label: 'Timestamp', name: 'linkTimestamp' },
	{ label: 'Timestamp (hover)', name: 'linkTimestampHover' },
	{ label: 'Reposted By Header', name: 'repostHeader' },
	{ label: 'Main Post Text', name: 'text' },
];

export const darkModeColors: ColorList = {
	background: 'rgb(22, 30, 39)',
	border: 'rgb(46, 64, 82)',
	counts: 'rgb(174, 187, 201)',
	link: 'rgb(32, 139, 254)',
	linkHandle: 'rgb(174, 187, 201)',
	linkHandleHover: 'rgb(174, 187, 201)',
	linkHover: 'rgb(79, 162, 249)',
	linkLinkCard: 'rgb(255, 255, 255)',
	linkLinkCardHover: 'rgb(255, 255, 255)',
	linkName: 'rgb(255, 255, 255)',
	linkNameHover: 'rgb(255, 255, 255)',
	linkTimestamp: 'rgb(174, 187, 201)',
	linkTimestampHover: 'rgb(174, 187, 201)',
	repostHeader: 'rgb(174, 187, 201)',
	text: 'rgb(255, 255, 255)',
};

export const lightModeColors: ColorList = {
	background: 'rgb(255, 255, 255)',
	border: 'rgb(212, 219, 226)',
	counts: 'rgb(111, 134, 159)',
	link: 'rgb(11, 15, 20)',
	linkHandle: 'rgb(66, 87, 108)',
	linkHandleHover: 'rgb(66, 87, 108)',
	linkHover: 'rgb(71, 160, 255)',
	linkLinkCard: 'rgb(16, 131, 254)',
	linkLinkCardHover: 'rgb(0, 0, 0)',
	linkName: 'rgb(11, 15, 20)',
	linkNameHover: 'rgb(11, 15, 20)',
	linkTimestamp: 'rgb(0, 0, 0)',
	linkTimestampHover: 'rgb(0, 0, 0)',
	repostHeader: 'rgb(0, 0, 0)',
	text: 'rgb(66, 87, 108)',
};

const ColorPickers: React.FC<Props> = ({ form }) => {
	const colorObjs: ColorObj[] = colors.map((color) => ({
		label: color.label,
		name: color.name,
		value: form.values.colors[color.name],
	}));

	return colorObjs.map((colorObj) => (
		<ColorInput
			format="rgb"
			key={colorObj.name}
			label={colorObj.label}
			mb={10}
			{...form.getInputProps(`colors.${colorObj.name}`)}
		/>
	));
};

export default ColorPickers;

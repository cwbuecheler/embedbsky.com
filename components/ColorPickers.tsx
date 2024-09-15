// Mantine & Related
import { ColorInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

// TS Types
import { ColorList, ColorObj, FormValues } from '@/types/data';

type Props = {
	darkmode: boolean;
	form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

export const darkModeColors: ColorList = {
	background: 'rgb(22, 30, 39)',
	border: 'rgb(46, 64, 82)',
	counts: 'rgb(174, 187, 201)',
	text: 'rgb(255, 255, 255)',
	link: 'rgb(32, 139, 254)',
	linkHover: 'rgb(79, 162, 249)',
	linkHandleHover: 'rgb(174, 187, 201)',
	linkHandle: 'rgb(174, 187, 201)',
	linkNameHover: 'rgb(255, 255, 255)',
	linkName: 'rgb(255, 255, 255)',
	linkTimestamp: 'rgb(174, 187, 201)',
	linkTimestampHover: 'rgb(174, 187, 201)',
	linkLinkCard: 'rgb(255, 255, 255)',
	linkLinkCardHover: 'rgb(255, 255, 255)',
	repostHeader: 'rgb(174, 187, 201)',
};

export const lightModeColors: ColorList = {
	background: 'rgb(255, 255, 255)',
	border: 'rgb(212, 219, 226)',
	counts: 'rgb(111, 134, 159)',
	link: 'rgb(11, 15, 20)',
	linkHover: 'rgb(71, 160, 255)',
	linkHandle: 'rgb(66, 87, 108)',
	linkHandleHover: 'rgb(66, 87, 108)',
	linkLinkCard: 'rgb(16, 131, 254)',
	linkLinkCardHover: 'rgb(0, 0, 0)',
	linkName: 'rgb(11, 15, 20)',
	linkNameHover: 'rgb(11, 15, 20)',
	linkTimestamp: 'rgb(0, 0, 0)',
	linkTimestampHover: 'rgb(0, 0, 0)',
	repostHeader: 'rgb(0, 0, 0)',
	text: 'rgb(66, 87, 108)',
};

const ColorPickers: React.FC<Props> = (props) => {
	const { darkmode, form } = props;

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

	const generateColorObjs = (): ColorObj[] => {
		const listToUse = darkmode ? darkModeColors : lightModeColors;
		const colorObjList: ColorObj[] = colors.map((color) => {
			return {
				label: color.label,
				name: color.name,
				value: listToUse[color.name],
			};
		});
		return colorObjList;
	};

	const colorObjs = generateColorObjs();

	return colorObjs.map((colorObj) => (
		<ColorInput
			defaultValue={colorObj.value}
			format="rgb"
			key={colorObj.name}
			label={colorObj.label}
			mb={10}
			{...form.getInputProps(`colors.${colorObj.name}`)}
		/>
	));
};

export default ColorPickers;

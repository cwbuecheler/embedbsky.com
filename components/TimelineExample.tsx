'use client';

// Mantine & Associated
import { UseFormReturnType } from '@mantine/form';

// Local Modules
import classes from '@/components/TimelineExample.module.css';

// TS Types
import { FormValues } from '@/types/data';
import { createStyles, generateCustomCSS } from '@/util/shared';

type TimelineExampleProps = {
	darkmode: boolean;
	embedHTML: string;
	form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
	showColors: boolean;
};

const TimelineExample: React.FC<TimelineExampleProps> = (props) => {
	const { darkmode, embedHTML, form, showColors } = props;
	const classNames = `${classes.embedexample} ${darkmode ? `${classes.darkmode} darkmode` : ''}`;
	return (
		<>
			<link rel="stylesheet" href="/embedbsky.com-master.css" />
			{showColors ? <style type="text/css">{generateCustomCSS(createStyles(form))}</style> : null}
			<div
				className={classNames}
				dangerouslySetInnerHTML={{ __html: embedHTML }}
				id="embedbsky-com-timeline-embed"
			></div>
		</>
	);
};

export default TimelineExample;

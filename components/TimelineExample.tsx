'use client';

// Local Modules
import classes from '@/components/TimelineExample.module.css';
import { createStyles, generateCustomCSS } from '@/util/shared';

// TS Types
import { ColorList } from '@/types/data';

type TimelineExampleProps = {
	colors: ColorList | undefined;
	darkmode: boolean;
	embedHTML: string;
	showColors: boolean;
};

const TimelineExample: React.FC<TimelineExampleProps> = (props) => {
	const { colors, darkmode, embedHTML, showColors } = props;
	const classNames = `${classes.embedexample} ${darkmode ? `${classes.darkmode} darkmode` : ''}`;
	return (
		<>
			<link rel="stylesheet" href="/embedbsky.com-master.css" />
			{showColors && colors ? (
				<style type="text/css">{generateCustomCSS(createStyles(colors))}</style>
			) : null}
			<div
				className={classNames}
				dangerouslySetInnerHTML={{ __html: embedHTML }}
				id="embedbsky-com-timeline-embed"
			></div>
		</>
	);
};

export default TimelineExample;

import { UseFormReturnType } from '@mantine/form';

import { ColorList, FormValues } from '@/types/data';

// Create styles for use in generated code and example (used w/ custom colors)
export const createStyles = (
	form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>,
): ColorList => {
	const styles = {
		background: form.values.colors.background,
		border: form.values.colors.border,
		counts: form.values.colors.counts,
		text: form.values.colors.text,
		link: form.values.colors.link,
		linkHover: form.values.colors.linkHover,
		linkHandleHover: form.values.colors.linkHandleHover,
		linkHandle: form.values.colors.linkHandle,
		linkNameHover: form.values.colors.linkNameHover,
		linkName: form.values.colors.linkName,
		linkTimestamp: form.values.colors.linkTimestamp,
		linkTimestampHover: form.values.colors.linkTimestampHover,
		linkLinkCard: form.values.colors.linkLinkCard,
		linkLinkCardHover: form.values.colors.linkLinkCardHover,
		repostHeader: form.values.colors.repostHeader,
	};
	return styles;
};

export const generateCustomCSS = (styles: ColorList) =>
	`#embedbsky-com-timeline-embed .postcontainer {background:${styles.background};}#embedbsky-com-timeline-embed .postcontainer .repostheader {color:${styles.repostHeader};}#embedbsky-com-timeline-embed .postcontainer .repostheader a {color:${styles.repostHeader};}#embedbsky-com-timeline-embed .postcontainer .postbox {border-bottom: 1px solid ${styles.border};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text {color: var(--v-color-text);}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:hover {color:${styles.linkName};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:hover {color:${styles.linkNameHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle {color:${styles.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:hover {color:${styles.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:hover {color:${styles.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:hover {color:${styles.linkTimestamp};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:hover {color:${styles.linkTimestampHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:active {color:${styles.link};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:hover {color:${styles.linkHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard {border: 1px solid ${styles.border};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard a {color:${styles.linkLinkCard};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard .site {color:${styles.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .icons .num {color:${styles.counts};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .quotebox {border: 1px solid ${styles.border};}`;

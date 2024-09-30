import { ColorList } from '@/types/data';

// Create styles for use in generated code and example (used w/ custom colors)
export const createStyles = (colors: ColorList): ColorList => {
	const styles = {
		background: colors.background,
		border: colors.border,
		counts: colors.counts,
		text: colors.text,
		link: colors.link,
		linkHover: colors.linkHover,
		linkHandleHover: colors.linkHandleHover,
		linkHandle: colors.linkHandle,
		linkNameHover: colors.linkNameHover,
		linkName: colors.linkName,
		linkTimestamp: colors.linkTimestamp,
		linkTimestampHover: colors.linkTimestampHover,
		linkLinkCard: colors.linkLinkCard,
		linkLinkCardHover: colors.linkLinkCardHover,
		repostHeader: colors.repostHeader,
	};
	return styles;
};

export const generateCustomCSS = (colors: ColorList) =>
	`#embedbsky-com-timeline-embed .postcontainer {background:${colors.background};}#embedbsky-com-timeline-embed .postcontainer .repostheader {color:${colors.repostHeader};}#embedbsky-com-timeline-embed .postcontainer .repostheader a {color:${colors.repostHeader};}#embedbsky-com-timeline-embed .postcontainer .postbox {border-bottom: 1px solid ${colors.border};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text {color: var(--v-color-text);}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:hover {color:${colors.linkName};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text strong a:hover {color:${colors.linkNameHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle {color:${colors.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:hover {color:${colors.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .handle a:hover {color:${colors.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:active,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:hover {color:${colors.linkTimestamp};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .timeago a:hover {color:${colors.linkTimestampHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:link,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:visited,#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:active {color:${colors.link};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .textcopy a:hover {color:${colors.linkHover};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard {border: 1px solid ${colors.border};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard a {color:${colors.linkLinkCard};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .linkcard .site {color:${colors.linkHandle};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .icons .num {color:${colors.counts};}#embedbsky-com-timeline-embed .postcontainer .postbox .col.text .quotebox {border: 1px solid ${colors.border};}`;

// Display the JS code for the user
export const generateJS = (
	returnedURI: string,
	width: number | null,
	height: number | null,
	darkmode: boolean,
	showColors: boolean,
	colors: ColorList | undefined,
) => {
	let w = width ? width : 0;
	let h = height ? height : 0;
	let js = '<link rel="stylesheet" href="https://embedbsky.com/embedbsky.com-master-min.css" />';
	// handle custom colors
	if (showColors && colors) {
		js += '<style type="text/css">';
		js += generateCustomCSS(createStyles(colors));
		js += `</style>`;
		js += `<div id="embedbsky-com-timeline-embed"></div>`;
	} else {
		js += `<div id="embedbsky-com-timeline-embed"${darkmode ? ' class="darkmode"' : ''}></div>`;
	}
	js += '<script>';
	js += `let containerWidth=${w},containerHeight=${h};`;
	js += 'const getHtml=async t=>{';
	js += `const e=await fetch(t);`;
	js += `return 200!==e.status?'<p><strong>No feed data could be located</p></strong>':e.text()`;
	js += '};';
	js += `document.addEventListener('DOMContentLoaded',(async()=>{`;
	js += `const t=(new Date).toISOString(),e=document.getElementById('embedbsky-com-timeline-embed');`;
	// handle responsive
	if (w > 0) {
		js += 'e.style.width=`${containerWidth}px`,e.style.height=`${containerHeight}px`;';
	} else {
		js += 'e.style.width="100%",e.style.height=`${containerHeight}px`;';
	}
	js += 'const n=await getHtml(`' + returnedURI + '?v=${t}`);';
	js += 'e.innerHTML=n';
	js += '}));';
	js += '</script>';
	return js;
};

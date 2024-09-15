export type API = {
	[key: string]: (...args: any[]) => Promise<APIResponse>;
	lookupFeed: (feedId: string) => Promise<APIResponse>;
	createFeed: (feedId: string) => Promise<APIResponse>;
};

export type APIResponse = {
	data: any;
	error: string;
	success: boolean;
};

export type ColorList = {
	[key: string]: string;
	background: string;
	border: string;
	counts: string;
	text: string;
	link: string;
	linkHover: string;
	linkHandleHover: string;
	linkHandle: string;
	linkNameHover: string;
	linkName: string;
	linkTimestamp: string;
	linkTimestampHover: string;
	linkLinkCard: string;
	linkLinkCardHover: string;
	repostHeader: string;
};

export type ColorObj = {
	label: string;
	name: string;
	value: string;
};

export type FormValues = {
	bskyHandle: string;
	colors: FormColors;
	height: number | null;
	width: number | null;
};

export type FormColors = {
	background: string;
	border: string;
	counts: string;
	link: string;
	linkHandle: string;
	linkHandleHover: string;
	linkHover: string;
	linkLinkCard: string;
	linkLinkCardHover: string;
	linkName: string;
	linkNameHover: string;
	linkTimestamp: string;
	linkTimestampHover: string;
	repostHeader: string;
	text: string;
};

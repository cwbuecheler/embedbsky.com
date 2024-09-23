export type API = {
	createFeed: (bskyId: string, did: string) => Promise<APIResponse>;
	login: (bskyId: string) => Promise<APIResponse>;
	lookupFeed: (bskyId: string) => Promise<APIResponse>;
	verifyLogin: (code: string, iss: string, state: string) => Promise<APIResponse>;
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

export type ColorObj = {
	label: string;
	name: string;
	value: string;
};

export type FormValues = {
	bskyHandle: string;
	colors: ColorList;
	height: number | null;
	width: number | null;
};

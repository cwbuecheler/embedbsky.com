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

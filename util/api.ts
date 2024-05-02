type API = {
	[key: string]: (...args: any[]) => Promise<APIResponse>;
	lookupFeed: (feedId: string) => Promise<APIResponse>;
};

type APIResponse = {
	error?: any;
	data?: any;
};

const API_URI = process.env.NEXT_PUBLIC_API_URL;

export const api: API = {
	lookupFeed: async (bskyId: string) => {
		try {
			const response = await fetch(`${API_URI}/lookup/${bskyId}`);
			const json = await response.json();
			return { data: json };
		} catch (err: any) {
			return {
				error: err,
			};
		}
	},
};

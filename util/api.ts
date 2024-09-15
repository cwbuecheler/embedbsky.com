import { API } from '@/types/data';

const API_URI = process.env.NEXT_PUBLIC_API_URL;

const handleFetchResponse = async (resp: Response) => {
	if (resp.status === 200 || resp.status === 201) {
		const json = await resp.json();
		return { data: json.data, error: '', success: true };
	}
	if (resp.status === 403) {
		return {
			data: '403',
			error: 'Sorry, this user has their timeline set to viewable by authenticated users only',
			success: true,
		};
	}
	return { data: '', error: `Fetch - ${resp.status} - ${resp.statusText}`, success: false };
};

export const api: API = {
	lookupFeed: async (bskyId: string) => {
		try {
			const response = await fetch(`${API_URI}/lookup/${bskyId}`);
			const handlerResp = await handleFetchResponse(response);
			if (!handlerResp.success) {
				throw new Error(handlerResp.error || 'API - An unknown error occurred - lookupFeed');
			}
			return handlerResp;
		} catch (err: any) {
			return {
				data: '',
				error: err.message,
				success: false,
			};
		}
	},

	createFeed: async (bskyId: string) => {
		try {
			const response = await fetch(`${API_URI}/create/${bskyId}`);
			const handlerResp = await handleFetchResponse(response);
			if (!handlerResp.success) {
				throw new Error(handlerResp.error || 'API - An unknown error occurred - createFeed');
			}
			return handlerResp;
		} catch (err: any) {
			return {
				data: '',
				error: err.message,
				success: false,
			};
		}
	},
};

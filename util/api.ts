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
			error: `Sorry, either this account doesn't have permission, or this timeline's been made available only to logged-in users.`,
			success: true,
		};
	}
	return { data: '', error: `Fetch - ${resp.status} - ${resp.statusText}`, success: false };
};

export const api: API = {
	createFeed: async (bskyId: string, did: string) => {
		try {
			const response = await fetch(`${API_URI}/create/${bskyId}`, {
				body: JSON.stringify({
					did,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
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
	login: async (bskyId: string) => {
		try {
			const response = await fetch(`${API_URI}/login/${bskyId}`);
			const handlerResp = await handleFetchResponse(response);
			if (!handlerResp.success) {
				throw new Error(handlerResp.error || 'API - An unknown error occurred - login');
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
	verifyLogin: async (code: string, iss: string, state: string) => {
		try {
			const response = await fetch(`${API_URI}/login/verify`, {
				method: 'POST',
				body: JSON.stringify({
					code,
					iss,
					state,
				}),
			});
			const handlerResp = await handleFetchResponse(response);
			if (!handlerResp.success) {
				throw new Error(handlerResp.error || `API - An unknown error occured - verifyLogin`);
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

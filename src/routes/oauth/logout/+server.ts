import { getOAuthClient } from '$lib/auth/client';
import { redirect, type RequestHandler } from '@sveltejs/kit';

const PUBLIC_URL = process.env.PUBLIC_URL || 'http://127.0.0.1:5173';

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const did = cookies.get('did');
		if (did) {
			const client = await getOAuthClient();
			await client.revoke(did);
		}

		cookies.delete('did', { path: '/' });
		return redirect(301, new URL('/', PUBLIC_URL));
	} catch (error) {
		console.error('Logout error:', error);
		cookies.delete('did', { path: '/' });
		return redirect(302, new URL('/', PUBLIC_URL));
	}
};

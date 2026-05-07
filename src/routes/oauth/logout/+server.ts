import { getOAuthClient } from '$lib/auth/client';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
	try {
		const did = cookies.get('did');
		if (did) {
			const client = await getOAuthClient();
			await client.revoke(did);
		}
		cookies.delete('did', { path: '/' });
		return new Response(JSON.stringify({ success: true }));
	} catch (error) {
		console.error('Logout error:', error);
		cookies.delete('did', { path: '/' });
		return new Response(JSON.stringify({ success: true }));
	}
};

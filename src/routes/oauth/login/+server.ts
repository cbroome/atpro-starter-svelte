import { getOAuthClient, SCOPE } from '$lib/auth/client';

import { error } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	console.log(request);
	try {
		const { handle } = await request.json();

		if (!handle || typeof handle !== 'string') {
			error(400, 'Handle is required');
		}

		const client = await getOAuthClient();

		// Resolves handle, finds their auth server, returns authorization URL
		const authUrl = await client.authorize(handle, {
			scope: SCOPE
		});

		return new Response(JSON.stringify({ redirectUrl: authUrl.toString() }));
	} catch (err) {
		console.error('OAuth login error:', err);
		error(500, (err as Error)?.message || 'Login failed');
	}
};

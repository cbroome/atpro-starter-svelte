import { getOAuthClient } from '$lib/auth/client';
import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

// TODO: proper syntax for this....
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://127.0.0.1:5173';

/**
 * Handles the OAuth callback request.
 *
 * @param {{request: Request, cookies: Cookies}} - The request and cookies objects provided by SvelteKit.
 * @throws {Redirect} - Redirects to the home page with an error query parameter if the OAuth callback fails.
 */
export const GET: RequestHandler = async ({ request, cookies }) => {
	try {
		const requestURL = new URL(request.url);
		const params = requestURL.searchParams;
		const client = await getOAuthClient();

		// Exchange code for session
		const { session } = await client.callback(params);

		// Set DID cookie
		cookies.set('did', session.did, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/'
		});
	} catch (error) {
		console.error('OAuth callback error:', error);
		throw redirect(302, new URL('/?error=login_failed', PUBLIC_URL));
	}
	throw redirect(301, new URL('/', PUBLIC_URL));
};

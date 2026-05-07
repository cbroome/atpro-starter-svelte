// import { cookies } from 'next/headers';
import type { Cookies } from '@sveltejs/kit';
import { getOAuthClient } from './client';
import type { OAuthSession } from '@atproto/oauth-client-node';

export async function getSession(cookies: Cookies): Promise<OAuthSession | null> {
	const did = await getDid(cookies);
	if (!did) return null;

	try {
		const client = await getOAuthClient();
		return await client.restore(did);
	} catch {
		return null;
	}
}

export async function getDid(cookies: Cookies): Promise<string | null> {
	return cookies.get('did') ?? null;
}

import { getSession } from '$lib/auth/session';

export const load = async ({ cookies }) => {
	const session = await getSession(cookies);
	return {
		session: {
			did: session?.did
		}
	};
};

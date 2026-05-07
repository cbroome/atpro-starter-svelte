<script lang="ts">
	let error = $state();
	let loading = $state();
	let handle = $state();

	const onSubmit = async (
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget, event.submitter);

		handle = data.get('handle') as string;

		try {
			const res = await fetch('/oauth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ handle })
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || 'Login failed');
			}

			// Redirect to authorization server
			window.location.href = data.redirectUrl;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Login failed';
			loading = false;
		}
	};
</script>

<form class="space-y-4" onsubmit={onSubmit}>
	<div>
		<label for="handle" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
			Handle
		</label>
		<input
			id="handle"
			type="text"
			name="handle"
			placeholder="user.example.com"
			class="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
		/>
	</div>

	{#if error}
		<p class="text-red-500 text-sm">{error}</p>
	{/if}

	<button
		type="submit"
		class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
	>
		{loading ? 'Signing in...' : 'Sign in'}
	</button>
</form>

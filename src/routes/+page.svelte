<script lang="ts">
	import LoginForm from '$lib/components/LoginForm/index.svelte';
	import LogoutButton from '$lib/components/LogoutButton/index.svelte';

	let { data } = $props();
	const { session } = data;
</script>

<div class="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
	<main class="w-full max-w-md mx-auto p-8">
		<div class="text-center mb-8">
			<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">AT Protocol OAuth</h1>
			<p class="text-zinc-600 dark:text-zinc-400">Sign in with your AT Protocol account</p>
		</div>

		<div
			class="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6"
		>
			{#if session}
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<p class="text-sm text-zinc-600 dark:text-zinc-400">
							Signed in as
							<span class="font-mono">{session.did}</span>
						</p>
						<LogoutButton />
					</div>
					<p class="text-green-600">Authentication working!</p>
				</div>
			{:else}
				<p class="text-zinc-600 dark:text-zinc-400 mb-4">
					You are not signed in. Please log in to continue.
				</p>
				<LoginForm />
			{/if}
		</div>
	</main>
</div>

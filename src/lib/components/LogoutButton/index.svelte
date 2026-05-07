<script lang="ts">
	function LogoutButton() {
		// const router = useRouter();

		async function handleLogout() {
			await fetch('/oauth/logout', { method: 'POST' });
			// router.refresh();
		}
	}
</script>

<button
	class="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
>
	Sign out
</button>

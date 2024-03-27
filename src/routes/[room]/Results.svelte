<script lang="ts">
	import { page } from '$app/stores';
	import type { Player } from '$lib/types';

	const {
		players,
		me,
		restart
	}: { players: Player[]; me: Player | undefined; restart: () => void } = $props();

	const sortedPlayers = [...players].sort((a, b) => {
		return Number(a.results[3]) - Number(b.results[3]);
	});
</script>

<div
	class="relative flex min-h-[50%] w-full flex-col items-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
>
	<p
		class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
	>
		Results Game Code: <span class="font-mono">{$page.params.room}</span>
	</p>

	<div class="flex w-full flex-col items-center gap-2">
		{#each sortedPlayers as player, i}
			<p class="p-2" class:font-bold={player.id === me?.id}>
				{player.userName} - {(+player.results[3] / 1000).toFixed(3)}s
			</p>
		{/each}
	</div>
	<div class="flex-1"></div>

	<button onclick={restart} class="btn btn-primary btn-lg">Restart Game</button>
</div>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import { page } from '$app/stores';
	import type { GameState, Player } from '$lib/types';

	const {
		gameState,
		me,
		restart
	}: { gameState: GameState; me: Player | undefined; restart: () => void } = $props();

	let step = $state(-1);
	let sortedPlayers = $state([...gameState.players]);

	function stepThroughResults() {
		step += 1;
		sortedPlayers = [...gameState.players].sort((a, b) => {
			return Number(a.results[step]) - Number(b.results[step]);
		});
		if (step < gameState.buttonCount - 1) {
			setTimeout(stepThroughResults, 1000);
		}
	}

	$inspect(step);

	setTimeout(stepThroughResults, 1000);
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
		<p>💡 x {step + 1}</p>
		{#each sortedPlayers as player, i (player.id)}
			<p
				class="rounded-lg p-2 px-4"
				class:bg-yellow-300={step === gameState.buttonCount - 1 && i === 0}
				class:text-black={step === gameState.buttonCount - 1 && i === 0}
				animate:flip
			>
				{step === gameState.buttonCount - 1 && i === 0 ? '🏆 ' : ''}
				{player.userName}{player.id === me?.id ? ' (me)' : ''}
				{step >= 0 ? ` - ${(+player.results[step] / 1000).toFixed(3)}s` : ''}
			</p>
		{/each}
	</div>
	<div class="flex-1"></div>

	<button onclick={restart} class="btn btn-primary btn-lg">Restart Game</button>
</div>

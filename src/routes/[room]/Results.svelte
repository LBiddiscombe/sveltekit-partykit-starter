<script lang="ts">
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import type { GameState, Player } from '$lib/types';

	const {
		gameState,
		me,
		isHost,
		restart
	}: { gameState: GameState; me: Player | undefined; isHost: Boolean; restart: () => void } =
		$props();

	let step = $state(-1);
	let sortedPlayers = $state([...gameState.players]);

	function skipToResult() {
		step = gameState.buttonCount - 1;
	}

	function stepThroughResults() {
		if (step >= gameState.buttonCount - 1) return;
		step += 1;
		sortedPlayers = [...gameState.players].sort((a, b) => {
			return Number(a.results[step]) - Number(b.results[step]);
		});
		if (step < gameState.buttonCount - 1) {
			setTimeout(stepThroughResults, 300);
		}
	}

	setTimeout(stepThroughResults, 2000);
</script>

<div class="flex w-full flex-col items-center gap-2">
	{#if step < 0}
		<p>Who was the fastest?</p>
	{:else if step < gameState.buttonCount - 1}
		<p>{`Button ${step + 1} of ${gameState.buttonCount}`}</p>
	{:else}
		<p>And the winner is...</p>
	{/if}
	{#each sortedPlayers as player, i (player.id)}
		<p
			class="rounded-lg p-2 px-4"
			class:bg-yellow-300={step === gameState.buttonCount - 1 && i === 0}
			class:text-black={step === gameState.buttonCount - 1 && i === 0}
			animate:flip={{ duration: 250, easing: quintOut }}
		>
			{step === gameState.buttonCount - 1 && i === 0 ? '🏆 ' : ''}
			{player.userName}{player.id === me?.id ? ' (me)' : ''}
			{step >= 0 ? ` - ${(+player.results[step] / 1000).toFixed(3)}s` : ''}
		</p>
	{/each}
</div>

<div class="flex-1"></div>
{#if step < gameState.buttonCount - 1}
	<button onclick={skipToResult} class="underline">Skip to result</button>
{/if}
{#if isHost}
	<button onclick={restart} class="btn btn-primary btn-lg">Restart Game</button>
{:else}
	<p class="text-sm">Waiting for host to restart the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>

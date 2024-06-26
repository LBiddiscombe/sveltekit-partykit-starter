<script lang="ts">
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { room } from './room.svelte';
	import type { Player } from '$lib/types';
	import { onMount } from 'svelte';

	const { gameState, me, isHost } = $derived(room);

	let step = $state(-1);
	let sortedPlayers: Player[] = $state([]);
	let isPB: boolean = $state(false);

	onMount(() => {
		sortedPlayers = [...gameState.players];
		function stepThroughResults() {
			if (step >= gameState.buttons.length - 1) return;
			step += 1;
			sortedPlayers = [...gameState.players].sort((a, b) => {
				return Number(a.results[step]) - Number(b.results[step]);
			});
			if (step < gameState.buttons.length - 1) {
				setTimeout(stepThroughResults, 300);
			}
		}

		if (me) {
			const prevPB = Number(localStorage.getItem(`pb${gameState.buttons.length}`) || Infinity);
			if (me.results[gameState.buttons.length - 1] < prevPB) {
				isPB = true;
				localStorage.setItem(
					`pb${gameState.buttons.length}`,
					JSON.stringify(me.results[gameState.buttons.length - 1])
				);
			}
		}

		setTimeout(stepThroughResults, 1000);
	});
</script>

<div data-testid="results" class="flex w-full flex-col items-center gap-2">
	{#if step < 0}
		<p>Who was the fastest?</p>
	{:else if step < gameState.buttons.length - 1}
		<p>{`Button ${step + 1} of ${gameState.buttons.length}`}</p>
	{:else}
		<p>And the winner is...</p>
	{/if}
	{#each sortedPlayers as player, i (player.id)}
		<div
			class="rounded-lg p-2 px-4"
			class:bg-yellow-300={step === gameState.buttons.length - 1 && i === 0}
			class:text-black={step === gameState.buttons.length - 1 && i === 0}
			animate:flip={{ duration: 250, easing: quintOut }}
		>
			{step === gameState.buttons.length - 1 && i === 0 ? '🏆 ' : ''}
			{player.userName}{player.id === me?.id ? ' (me)' : ''}
			{step >= 0 ? ` - ${(+player.results[step] / 1000).toFixed(3)}s` : ''}
			{#if isPB}
				<div class="badge badge-warning ml-2">pb</div>
			{/if}
		</div>
	{/each}
</div>

<div class="flex-1"></div>
{#if step >= gameState.buttons.length - 1}
	{#if isHost}
		<button onclick={() => room.resetGame()} class="btn btn-primary btn-lg">Play Again</button>
	{:else}
		<p class="text-sm">Waiting for host to restart the game</p>
	{/if}
	<a href="/" class="underline">Leave Game</a>
{/if}

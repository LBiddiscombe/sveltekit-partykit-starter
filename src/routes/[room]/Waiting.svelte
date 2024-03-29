<script lang="ts">
	import { page } from '$app/stores';
	import type { GameState, Player } from '$lib/types';

	const {
		gameState,
		me,
		isHost,
		start
	}: { gameState: GameState; me: Player | undefined; isHost: Boolean; start: () => void } =
		$props();
</script>

<div class="flex w-full flex-col items-center gap-2">
	{#if me}
		<p class="text-xl">Hi, {me.userName} {isHost ? '(host)' : ''}</p>
	{/if}
	{#if gameState.players.length > 1}
		<!-- content here -->
		<div class="divider">Other Players</div>
		{#each gameState.players as player, i}
			{#if player.id !== me?.id}
				<p class="p-2">
					{player.userName}
					{i === 0 ? '(host)' : ''}
				</p>
			{/if}
		{/each}
	{:else}
		<div class="divider w-full">Waiting for others</div>
	{/if}
</div>

<div class="flex-1"></div>
{#if isHost}
	<button onclick={start} class="btn btn-primary btn-lg">Start Game</button>
{:else}
	<p class="text-sm">Waiting for host to start the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>

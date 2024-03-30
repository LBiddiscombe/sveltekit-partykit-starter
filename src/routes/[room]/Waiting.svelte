<script lang="ts">
	import { room } from './room.svelte';
</script>

<div class="flex w-full flex-col items-center gap-2">
	{#if room.me}
		<p class="text-xl">Hi, {room.me.userName} {room.isHost ? '(host)' : ''}</p>
	{/if}
	{#if room.gameState.players.length > 1}
		<!-- content here -->
		<div class="divider">Other Players</div>
		{#each room.gameState.players as player, i}
			{#if player.id !== room.me?.id}
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
{#if room.isHost}
	<button onclick={() => room.start()} class="btn btn-primary btn-lg">Start Game</button>
{:else}
	<p class="text-sm">Waiting for host to start the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>

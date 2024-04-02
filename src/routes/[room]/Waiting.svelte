<script lang="ts">
	import { onMount } from 'svelte';
	import { room } from './room.svelte';
	const { gameState, me, isHost } = $derived(room);
	let pbs: { buttons: number; pb: number }[] = $state([]);

	onMount(() => {
		pbs = [
			{ buttons: 1, pb: Number(localStorage.getItem(`pb1`) || Infinity) },
			{ buttons: 4, pb: Number(localStorage.getItem(`pb4`) || Infinity) },
			{ buttons: 9, pb: Number(localStorage.getItem(`pb9`) || Infinity) },
			{ buttons: 16, pb: Number(localStorage.getItem(`pb16`) || Infinity) }
		];
		console.log(pbs);
	});
</script>

<div data-testid="waiting" class="flex w-full flex-col items-center gap-2">
	{#if me}
		<p class="text-xl">Hi, {me.userName} {isHost ? '(host)' : ''}</p>
		<p>Personal Bests</p>
		<div class="flex flex-nowrap gap-2 text-xs">
			{#each pbs as pb, i}
				<div class="flex flex-col items-center gap-1">
					<span>{Math.pow(i + 1, 2)}</span>
					<div class="badge badge-warning font-mono text-sm">
						<span>{pb.pb < Infinity ? (pb.pb / 1000).toFixed(3) : '__.___'}s</span>
					</div>
				</div>
			{/each}
		</div>
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
	<button onclick={() => room.startGame()} class="btn btn-primary btn-lg">Start Game</button>
{:else}
	<p class="text-sm">Waiting for host to start the game</p>
{/if}
<a href="/" class="underline">Leave Game</a>

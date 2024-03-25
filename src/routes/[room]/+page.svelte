<script lang="ts">
	import { page } from '$app/stores';
	import PartySocket from 'partysocket';
	import type { Player } from '$lib/types';

	let socket: PartySocket;

	let username: string = $state('');
	let message: string = $state('');

	let players: Player[] = $state([]);
	let me: Player | undefined = $state();

	function sendToPartyServer() {
		if (socket) {
			const parcel = JSON.stringify({
				message,
				username
			});

			socket.send(parcel);
		}
	}

	$effect(() => {
		socket = new PartySocket({
			host: 'http://192.168.1.8:1999',
			room: $page.params.room
		});

		// listen to the server's broadcasts (this.party.broadcast)
		socket.addEventListener('message', (event) => {
			console.log(event.data);
			players = JSON.parse(event.data);

			me = players.find((p) => p.id === socket.id);
		});

		return () => socket.removeEventListener('message', () => {});
	});
</script>

<div class="container mx-auto grid h-screen max-w-xl place-items-center p-4">
	<div
		class="relative flex min-h-[50%] w-full flex-col items-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
	>
		<p
			class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
		>
			Game Code: <span class="font-mono">{$page.params.room}</span>
		</p>

		<div class="flex w-full flex-col items-center gap-2">
			{#if me}
				<p class="text-2xl">Hi, {me.userName}</p>
			{/if}
			{#if players.length > 1}
				<!-- content here -->
				<div class="divider">Other Players</div>
				{#each players as player, i}
					{#if player.id !== me?.id}
						<p class="rounded-lg p-2" class:border={player.id === socket.id}>
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

		{#if players.length > 0 && players[0].id === socket.id}
			<button class="btn btn-primary btn-lg">Start Game</button>
		{:else}
			<p class="text-sm">Waiting for host to start the game</p>
		{/if}
	</div>
</div>

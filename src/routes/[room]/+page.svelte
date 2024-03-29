<script lang="ts">
	import { page } from '$app/stores';
	import PartySocket from 'partysocket';
	import type { GameState, Player } from '$lib/types';
	import Waiting from './Waiting.svelte';
	import Playing from './Playing.svelte';
	import Results from './Results.svelte';
	import { randomArrayItem } from '$lib';
	import { dev } from '$app/environment';

	let socket: PartySocket;
	let gameState: GameState | undefined = $state();
	let me: Player | undefined = $derived(gameState?.players.find((p) => p.id === socket?.id));
	let isHost: Boolean = $derived(me?.id === gameState?.players[0]?.id);

	function sendToPartyServer(type: string = 'syncGameState') {
		if (socket) {
			if (type === 'syncGameState') {
				const parcel = JSON.stringify({
					message: {
						type,
						data: gameState
					},
					id: socket.id
				});
				socket.send(parcel);
			}
		}
		if (type === 'syncPlayerState') {
			const parcel = JSON.stringify({
				message: {
					type,
					data: me
				},
				id: socket.id
			});
			socket.send(parcel);
		}
	}

	function start() {
		if (!gameState) return;
		gameState.status = 'Playing';
		sendToPartyServer();
	}

	function end() {
		if (!gameState) return;
		sendToPartyServer('syncPlayerState');
	}

	function restart() {
		if (!gameState) return;
		gameState.status = 'Waiting';
		gameState.buttonCount = randomArrayItem([1, 4, 9, 16]);
		gameState.players.forEach((p) => {
			p.results = [];
		});
		sendToPartyServer();
	}

	$effect(() => {
		socket = new PartySocket({
			host: dev
				? 'localhost:1999'
				: `https://sveltekit-partykit-starter-party.lbiddiscombe.partykit.dev`,
			room: $page.params.room,
			query: {
				playerName: $page.url.searchParams.get('name')
			}
		});

		// listen to the server's broadcasts (this.party.broadcast)
		socket.addEventListener('message', (event) => {
			gameState = JSON.parse(event.data);
		});

		return () => {
			socket.removeEventListener('message', () => {});
			socket.close();
		};
	});
</script>

<div
	class="mx-auto grid h-screen max-h-svh select-none place-items-center md:container md:max-h-[768px] md:max-w-md"
>
	<div class="flex h-full w-full flex-col items-center gap-8 py-8">
		<p class="w-full text-center text-2xl text-base-content">
			Game Code: <span class="rounded-full bg-base-300 p-4 font-mono">{$page.params.room}</span>
		</p>
		{#if gameState?.status === 'Waiting'}
			<Waiting {gameState} {me} {isHost} {start} />
		{:else if gameState?.status === 'Playing'}
			<Playing {gameState} {me} {end} />
		{:else if gameState?.status === 'Results'}
			<Results {gameState} {me} {isHost} {restart} />
		{/if}
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import PartySocket from 'partysocket';
	import type { GameState, Player } from '$lib/types';
	import Waiting from './Waiting.svelte';
	import Playing from './Playing.svelte';
	import Results from './Results.svelte';

	let socket: PartySocket;
	let gameState: GameState = $state();
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
		gameState.players.forEach((p) => {
			p.results = [];
		});
		sendToPartyServer();
	}

	$effect(() => {
		socket = new PartySocket({
			host: 'http://192.168.1.8:1999',
			room: $page.params.room
		});

		// listen to the server's broadcasts (this.party.broadcast)
		socket.addEventListener('message', (event) => {
			gameState = JSON.parse(event.data);
		});

		//return () => socket.removeEventListener('message', () => {});
	});
</script>

<div class="container mx-auto grid h-screen max-w-xl place-items-center p-4">
	{#if gameState?.status === 'Waiting'}
		<Waiting players={gameState.players} {me} {isHost} {start} />
	{:else if gameState?.status === 'Playing'}
		<Playing players={gameState.players} {me} {end} />
	{:else if gameState?.status === 'Results'}
		<Results players={gameState.players} {me} {restart} />
	{/if}
</div>

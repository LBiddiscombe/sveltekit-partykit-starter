<script lang="ts">
	import { page } from '$app/stores';
	import PartySocket from 'partysocket';

	let socket: PartySocket;

	let username: string = $state('');
	let message: string = $state('');

	let chat_history: string[] = $state([]);

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
			host: 'localhost:1999',
			room: $page.params.room
		});

		// listen to the server's broadcasts (this.party.broadcast)
		socket.addEventListener('message', (event) => {
			const envelope: { content: string } = JSON.parse(event.data);
			console.log(envelope);

			chat_history = [...chat_history, envelope.content];
		});

		return () => socket.removeEventListener('message', () => {});
	});
</script>

<div class="container mx-auto h-screen max-w-3xl bg-slate-50">
	<h1 class="">PartyKit: Tech Simplified</h1>
</div>

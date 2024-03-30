<script lang="ts">
	import Waiting from './Waiting.svelte';
	import Playing from './Playing.svelte';
	import Results from './Results.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { room } from './room.svelte';

	let { data } = $props();

	onMount(() => {
		room.connect(data.params.room, data.url.searchParams.get('name') ?? 'Guest');
	});

	onDestroy(() => {
		room.disconnect();
	});
</script>

<div
	class="mx-auto grid h-screen max-h-svh select-none place-items-center md:container md:max-h-[768px] md:max-w-md"
>
	<div class="flex h-full w-full flex-col items-center gap-8 py-8">
		<p class="w-full text-center text-2xl text-base-content">
			Game Code: <span class="rounded-full bg-base-300 p-4 font-mono">{data.params.room}</span>
		</p>
		{#if room.gameState?.status === 'Waiting'}
			<Waiting gameState={room.gameState} me={room.me} isHost={room.isHost} start={room.start} />
		{:else if room.gameState?.status === 'Playing'}
			<Playing gameState={room.gameState} me={room.me} end={room.end} />
		{:else if room.gameState?.status === 'Results'}
			<Results
				gameState={room.gameState}
				me={room.me}
				isHost={room.isHost}
				restart={room.restart}
			/>
		{/if}
	</div>
</div>

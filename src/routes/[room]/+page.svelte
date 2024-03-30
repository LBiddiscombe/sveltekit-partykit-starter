<script lang="ts">
	import Waiting from './Waiting.svelte';
	import Playing from './Playing.svelte';
	import Results from './Results.svelte';
	import { onMount } from 'svelte';
	import { room } from './room.svelte';

	let { data } = $props();

	onMount(() => {
		room.connect(data.params.room, data.url.searchParams.get('name') ?? 'Guest');
		return () => room.disconnect();
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
			<Waiting />
		{:else if room.gameState?.status === 'Playing'}
			<Playing />
		{:else if room.gameState?.status === 'Results'}
			<Results />
		{/if}
	</div>
</div>

<script lang="ts">
	import Waiting from './Waiting.svelte';
	import Playing from './Playing.svelte';
	import Results from './Results.svelte';
	import { onMount } from 'svelte';
	import { room } from './room.svelte';

	let { data } = $props();

	onMount(() => {
		room.join(data.params.room, data.url.searchParams.get('name') ?? 'Guest');
		return () => room.leave();
	});
</script>

<div
	class="mx-auto grid h-screen max-h-svh select-none place-items-center lg:container lg:max-h-[768px] lg:max-w-md"
>
	<div class="flex h-full w-full flex-col items-center gap-8 p-4 pb-16">
		<h1 class="w-full text-center text-2xl text-base-content">
			Game Code: <span class="rounded-xl bg-base-300 p-4 font-mono">{data.params.room}</span>
		</h1>
		{#if room.gameState?.status === 'Waiting'}
			<Waiting />
		{:else if room.gameState?.status === 'Playing'}
			<Playing />
		{:else if room.gameState?.status === 'Results'}
			<Results />
		{/if}
	</div>
</div>

<script lang="ts">
	import { page } from '$app/stores';
	import type { Player } from '$lib/types';

	const { players, me, end }: { players: Player[]; me: Player | undefined; end: () => void } =
		$props();

	let totalTime = 0;

	function play() {
		if (me) {
			const ts = Math.floor(Math.random() * 10000);
			totalTime += ts;
			me.results.push(totalTime);

			if (me.results.length === 4) {
				end();
			} else {
				setTimeout(play, ts);
			}
		}
	}

	play();
</script>

<div
	class="relative flex min-h-[50%] w-full flex-col items-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
>
	<p
		class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
	>
		Playing Game Code: <span class="font-mono">{$page.params.room}</span>
	</p>

	<div class="flex w-full flex-col items-center gap-2">
		{#if me}
			<p class="text-2xl">{me.userName}</p>
		{/if}
		{#if me && me.results.length < 4}
			<div class="divider w-full">Playing... {me?.results.length} / 4</div>
		{:else}
			<div class="divider w-full">Waiting for others</div>
		{/if}
	</div>
</div>

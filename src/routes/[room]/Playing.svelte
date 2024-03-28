<script lang="ts">
	import { page } from '$app/stores';
	import type { GameState, Player } from '$lib/types';
	import { shuffle } from '$lib/utils';

	const { gameState, me, end }: { gameState: GameState; me: Player | undefined; end: () => void } =
		$props();

	const buttons = $state(
		shuffle(
			Array(9)
				.fill({})
				.map((_, index) => ({ id: index + 1, lit: false }))
		)
	);
	let nextId = $state(1);
	let start = Date.now();

	let countdown = $state(3);

	function intro() {
		countdown -= 1;
		if (countdown > 0) {
			setTimeout(intro, 1000);
		}
		start = Date.now();
	}
	setTimeout(intro, 1000);

	function handleClick(e: MouseEvent) {
		if (!me) return;

		const target = e.target as HTMLButtonElement;
		const btn = buttons.find((b) => b.id === +target.value);
		btn.lit = true;
		nextId += 1;

		me.results.push(Date.now() - start);
		if (me.results.length === gameState.buttonCount) {
			end();
		}
	}
</script>

<div
	class="relative flex h-full max-h-[768px] w-full flex-col items-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
>
	<p
		class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
	>
		Playing Game Code: <span class="font-mono">{$page.params.room}</span>
	</p>

	<div class="flex h-full w-full flex-col items-center justify-center gap-2">
		{#if me}
			<p class="text-xl">{me.userName}{countdown > 0 ? ', get ready...' : `, let's go!`}</p>
		{/if}
		{#if me && me.results.length < gameState.buttonCount}
			<div class="grid place-items-center">
				{#if countdown > 0}
					<p class="text-6xl">{countdown}</p>
				{:else}
					<div class="grid grid-cols-3 grid-rows-3 gap-10 p-4">
						{#each buttons as btn}
							<button
								onclick={handleClick}
								value={btn.id}
								disabled={btn.id !== nextId}
								class="grid aspect-square w-16 select-none place-items-center rounded-full border text-2xl"
								class:bg-yellow-200={btn.lit}
								class:text-black={btn.lit}
							>
								{btn.id}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<div class="divider w-full">Yawn... waiting for others</div>
		{/if}
	</div>
</div>

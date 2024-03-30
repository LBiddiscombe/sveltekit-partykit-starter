<script lang="ts">
	import { shuffle } from '$lib/utils';
	import { room } from './room.svelte';

	const buttons = $state(
		shuffle(
			Array(room.gameState.buttonCount)
				.fill({})
				.map((_, index) => ({ id: index + 1, lit: false }))
		)
	);
	let nextId = $state(1);
	let start = Date.now();
	const colOptions = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];
	const cols = Math.floor(Math.sqrt(room.gameState.buttonCount));

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
		if (!room.me) return;

		const target = e.target as HTMLButtonElement;
		const btn = buttons.find((b) => b.id === +target.value);
		btn.lit = true;
		nextId += 1;

		room.me.results.push(Date.now() - start);
		if (room.me.results.length === room.gameState.buttonCount) {
			room.end();
		}
	}
</script>

{#if room.me}
	<p class="text-xl">{room.me.userName}{countdown > 0 ? ', get ready...' : `, let's go!`}</p>
{/if}
{#if room.me && room.me.results.length < room.gameState.buttonCount}
	{#if countdown > 0}
		<p class="text-6xl">{countdown}</p>
	{:else}
		<div
			class="grid aspect-square w-full grid-cols-{cols} grid-rows-{cols} place-items-center gap-4 p-4"
		>
			{#each buttons as btn}
				<button
					onclick={handleClick}
					value={btn.id}
					disabled={btn.id !== nextId}
					class="grid h-full w-full select-none place-items-center rounded-full border text-5xl"
					class:outline={btn.id === nextId}
					class:bg-yellow-200={btn.lit}
					class:text-black={btn.lit}
				>
					{btn.id}
				</button>
			{/each}
		</div>
	{/if}
{:else}
	<div class="divider w-full">Yawn... waiting for others</div>
{/if}

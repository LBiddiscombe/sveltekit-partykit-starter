<script lang="ts">
	import { onMount } from 'svelte';
	import { room } from './room.svelte';

	const colOptions = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];
	const { gameState, me } = $derived(room);
	const cols = $derived(Math.floor(Math.sqrt(gameState.buttons.length)));
	let nextId = $state(1);
	let start = Date.now();
	let countdown = $state(3);

	onMount(() => {
		function intro() {
			countdown -= 1;
			if (countdown > 0) {
				setTimeout(intro, 1000);
			}
			start = Date.now();
		}
		setTimeout(intro, 1000);
	});

	function handleClick(e: MouseEvent) {
		if (!me) return;

		const target = e.target as HTMLButtonElement;
		const btn = gameState.buttons.find((b) => b.id === +target.value);
		if (btn) btn.lit = true;
		nextId += 1;

		me.results.push(Date.now() - start);
		if (me.results.length === gameState.buttons.length) {
			room.endGame();
		}
	}
</script>

<div data-testid="playing"></div>
{#if me}
	<p class="text-xl">{me.userName}{countdown > 0 ? ', get ready...' : `, let's go!`}</p>
{/if}
{#if me && me.results.length < gameState.buttons.length}
	{#if countdown > 0}
		<p class="text-6xl">{countdown}</p>
	{:else}
		<div
			class="grid aspect-square w-full grid-cols-{cols} grid-rows-{cols} place-items-center gap-4 p-4"
		>
			{#each gameState.buttons as btn}
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

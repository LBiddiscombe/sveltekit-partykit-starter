<script lang="ts">
	import { onMount } from 'svelte';
	import { room } from './room.svelte';

	const colOptions = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];
	const { gameState, me } = $derived(room);
	const cols = $derived(Math.floor(Math.sqrt(gameState.buttons.length)));
	let nextId = $state(1);
	let start = Date.now();
	let countdown = $state(3);
	let penalties = $state(0);

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
		const target = e.target as HTMLButtonElement;
		if (+target.value !== nextId) {
			penalties += 0.5;
			return;
		}

		if (!me) return;

		const btn = gameState.buttons.find((b) => b.id === +target.value);
		if (btn) btn.lit = true;
		nextId += 1;

		me.results.push(Date.now() - start);
		if (me.results.length === gameState.buttons.length) {
			me.results[me.results.length - 1] += penalties;
			room.endGame();
		}
	}
</script>

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
					class="grid h-full w-full select-none place-items-center rounded-full border-4 border-base-300 bg-none text-5xl"
					class:lit={btn.id === nextId}
				>
				</button>
			{/each}
		</div>
		<p class="text-xl">
			Penalties: <span
				class="font-mono font-semibold"
				class:text-green-500={penalties <= 0}
				class:text-red-500={penalties > 0}>{penalties.toFixed(1)}s</span
			>
		</p>
	{/if}
{:else}
	<div class="divider w-full">Yawn... waiting for others</div>
{/if}
<div data-testid="playing"></div>

<style>
	button.lit {
		--neon: #00fe9b;
		--neon-glow: #02c435;
		border: 4px solid var(--neon);
		box-shadow:
			0 0 50px var(--neon-glow),
			inset 0 0 50px var(--neon-glow);
	}
</style>

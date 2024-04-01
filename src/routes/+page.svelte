<script lang="ts">
	import { getCode, getName } from '$lib';
	import { onMount } from 'svelte';
	let room = $state('');
	let name = $state('');

	let modal: HTMLDialogElement;

	onMount(() => {
		name = localStorage.getItem('name') || getName();
		const showHelp = !localStorage.getItem('name');
		if (showHelp) modal.showModal();
	});

	$effect(() => {
		localStorage.setItem('name', name);
	});

	$effect(() => {
		room = room.toUpperCase();
	});
</script>

<div
	class="mx-auto grid h-screen max-h-svh place-items-center md:container md:max-h-[768px] md:max-w-md"
>
	<div class="flex flex-col items-center gap-2">
		<div class="mb-12 flex items-center justify-center gap-2">
			<span class="text-4xl">Hi</span>
			<input
				type="text"
				bind:value={name}
				class="input input-lg input-bordered text-center"
				placeholder="Name"
			/>
			<button
				onclick={() => (name = getName())}
				class="btn btn-lg border-0 bg-base-100 p-0 text-4xl">🎲</button
			>
		</div>

		<div class="flex gap-2">
			<input
				type="text"
				bind:value={room}
				class="input input-lg input-bordered pr-4 font-mono text-4xl tracking-widest"
				autocorrect="off"
				autocomplete="off"
				autocapitalize="off"
				maxlength="4"
				size="4"
				placeholder="____"
			/>
			<a
				class="btn btn-primary btn-lg"
				href={room.length < 4 ? 'javascript:void(0)' : `/${room}?name=${name}`}>Join</a
			>
		</div>
		<div class="divider select-none">OR</div>
		<a class="btn btn-outline btn-secondary btn-lg" href="/{getCode()}?name={name}"
			>Host a New Game</a
		>

		<button class="mt-16 underline" onclick={() => modal.showModal()}>Show Help</button>
	</div>
</div>

<dialog id="my_modal" class="modal" bind:this={modal}>
	<div class="modal-box flex flex-col gap-4">
		<h1 class="text-lg font-bold">Simple Multiplayer Reaction Game</h1>
		<div class="divider"></div>
		<p class="">
			Create a new game room, and share the code with friends, or join with a code shared with you.
		</p>
		<p class="">The "game" is simple - you'll be shown 1, 4, 9 or 16 labelled buttons in a grid.</p>
		<p class="">They are in a random order.</p>
		<p class="">Click them in sequence starting at 1.</p>
		<p class="">Fastest to click them all wins!</p>
		<div class="modal-action">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

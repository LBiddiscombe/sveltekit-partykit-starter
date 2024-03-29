<script lang="ts">
	import { getCode, getName } from '$lib';
	let room = $state('');
	let name = $state(getName()); // todo: sync name to localStorage
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
			<a class="btn btn-primary btn-lg" href={room.length < 4 ? 'javascript:void(0)' : `/${room}`}
				>Join</a
			>
		</div>
		<div class="divider select-none">OR</div>
		<a class="btn btn-outline btn-secondary btn-lg" href="/{getCode()}?name={name}"
			>Host a New Game</a
		>
	</div>
</div>

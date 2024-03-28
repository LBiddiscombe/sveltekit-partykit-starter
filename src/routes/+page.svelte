<script lang="ts">
	import { getCode, getName } from '$lib';
	let room = $state('');
	let name = $state(getName()); // todo: sync name to localStorage
</script>

<div class="container mx-auto grid h-screen max-w-xl place-items-center p-4">
	<div
		class="relative flex h-full max-h-[768px] w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
	>
		<p
			class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
		>
			Multiplayer Example
		</p>

		<div class="flex items-center gap-4">
			<span class="text-4xl">Hi</span>
			<input
				type="text"
				bind:value={name}
				class="input input-lg input-bordered pr-4 text-4xl"
				placeholder="Name"
			/>
		</div>

		<div class="divider select-none"></div>

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

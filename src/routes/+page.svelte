<script lang="ts">
	import { getCode } from '$lib';
	let room = $state('');
</script>

<div class="container mx-auto grid h-screen max-w-xl place-items-center p-4">
	<div
		class="relative flex w-full flex-col items-center gap-4 rounded-xl border-2 border-base-300 bg-base-200 p-8 pt-24 shadow-lg"
	>
		<p
			class="absolute top-0 w-full rounded-t-xl bg-base-300 p-4 text-center text-2xl text-base-content"
		>
			Multiplayer Example
		</p>
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
		<a class="btn btn-outline btn-secondary btn-lg" href="/{getCode()}">Host a New Game</a>
	</div>
</div>

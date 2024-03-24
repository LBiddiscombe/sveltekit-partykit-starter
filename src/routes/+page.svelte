<script lang="ts">
	let { data } = $props();
	let room = $state('');
</script>

<div class="container mx-auto grid h-screen place-items-center">
	<div
		class="relative flex flex-col items-center gap-4 rounded-xl border-2 bg-slate-50 p-8 shadow-lg"
	>
		<p
			class="absolute top-0 w-full rounded-t-xl bg-primary p-4 text-center text-2xl text-primary-content"
		>
			Multiplayer Example
		</p>
		<p class="pt-12 text-xl">Hi, {data.userName}</p>
		<div class="flex gap-2">
			<input
				type="text"
				bind:value={room}
				class="input input-lg input-bordered pr-4 font-mono text-4xl tracking-widest"
				maxlength="4"
				size="4"
				placeholder="____"
			/>
			<a class="btn btn-primary btn-lg" href={room.length < 4 ? 'javascript:void(0)' : `/${room}`}
				>Join</a
			>
		</div>
		<div class="divider select-none">OR</div>
		<a class="btn btn-outline btn-secondary btn-lg" href="/{data.roomId}">Host a New Game</a>
	</div>
</div>

# sveltekit-partykit-starter

Thanks to: https://github.com/zeucapua/partykit-simplified


```
REPL for the mini game
<script>
	const buttons = $state(shuffle(Array(9).fill().map((_, index) => ({id: index + 1, lit: false, ts: null}))))
	let nextId = $state(1);
	let start = Date.now()

	function shuffle(array) {
	  for (let i = array.length - 1; i > 0; i--) {
	    const j = Math.floor(Math.random() * (i + 1))
	    ;[array[i], array[j]] = [array[j], array[i]]
	  }
	
	  return array
	}
	
	function handleClick(e) {
		const btn = buttons.find(b => b.id === +e.target.value)
		btn.lit = true;
		btn.ts = Date.now() - start
		nextId += 1;
	}

	$effect(() => {
		if (nextId > buttons.length) alert(JSON.stringify(buttons.sort((a,b) => a.id - b.id).map(b => `${b.id} ${b.ts}`), null, 2))
	})
	
</script>

<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"/>
</svelte:head>

<div class="grid place-items-center w-full h-full">
	<div class="grid grid-cols-3 grid-rows-3 gap-10 w-96 h-96 p-4 border">
		{#each buttons as btn}
			<button 
				onclick={handleClick}
				value={btn.id}
				disabled={btn.id !== nextId}
				class="user-none grid place-items-center border rounded-full h-20 w-20" 
				class:bg-yellow-200={btn.lit}>
				{btn.id}
			</button>
		{/each}
	</div>
</div>
```
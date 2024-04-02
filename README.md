# sveltekit-partykit-starter

A really simple multiplayer game that uses Sveltekit (Svelte 5) and PartyKit. Built as an experiment to see if I can use this for a bigger game... the results are great!

## The "Game"
Create a new game room, and share the code with friends, or join with a code shared with you.

The "game" is simple - you'll be shown a grid of 1, 4, 9 or 16 lights.

They will light in a random order, but everyone in the same room gets the same.

Click them all as fast as you can. A wrong move will be penalised with +0.5 seconds.

Fastest to click them all wins!

## Local Development
`npx partykit dev` to start the partykit development server

`npm run dev -- --open` to start the sveltekit development server

`npm run test` to check it hangs together

## Deploying partykit
`npx partykit deploy`

## Thanks
- [SvelteKit](https://kit.svelte.dev) for the best dev experience as always
- [PartyKit](https://www.partykit.io) for an amazingly easy to use multiplayer framework
- [zeudev](https://github.com/zeucapua)'s https://github.com/zeucapua/partykit-simplified repo for making it obvious where to begin!

import PartySocket from 'partysocket';
import type { PartyMessage, GameState, Player } from '$lib/types';
import { randomArrayItem } from '$lib';
import { dev } from '$app/environment';

class Room {
  socket: PartySocket | undefined = $state();
  gameState: GameState = $state({
    status: 'Waiting',
    buttonCount: 0,
    buttons: [],
    players: []
  });
  me: Player | undefined = $derived(this.gameState?.players.find((p) => p.id === this.socket?.id));
  isHost: boolean = $derived(this.me?.id === this.gameState?.players[0]?.id);

  join(room: string, name: string) {
    this.socket = new PartySocket({
      // @ts-ignore
      host: dev || window.isUnderTest
        ? 'http://192.168.1.8:1999'
        : `https://sveltekit-partykit-starter-party.lbiddiscombe.partykit.dev`,
      room,
      query: {
        playerName: name
      }
    });

    // listen to the server's broadcasts (this.party.broadcast)
    this.socket.addEventListener('message', (event) => {
      this.gameState = JSON.parse(event.data);
    });
  }

  leave() {
    if (!this.socket) return;

    this.socket.removeEventListener('message', () => { });
    this.socket.close();
    this.socket = undefined;
  }

  emitPartyMessage(type: PartyMessage) {
    if (!this.socket) return;

    const data = type === 'syncPlayerState' ? this.me : this.gameState;

    const parcel = JSON.stringify({
      message: {
        type,
        data
      },
      id: this.socket.id
    });
    this.socket.send(parcel);

  }

  startGame() {
    this.gameState.status = 'Playing';
    this.emitPartyMessage('syncGameState');
  }

  endGame() {
    this.emitPartyMessage('syncPlayerState');
  }

  resetGame() {
    this.emitPartyMessage('resetGame');
  }

}

export const room = new Room();
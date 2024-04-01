import PartySocket from 'partysocket';
import type { GameState, Player } from '$lib/types';
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
  isHost: Boolean = $derived(this.me?.id === this.gameState?.players[0]?.id);

  join(room: string, name: string) {
    console.log(dev)
    this.socket = new PartySocket({
      host: dev
        ? 'http://192.168.1.8:1999'
        : `https://sveltekit-partykit-starter-party.lbiddiscombe.partykit.dev`,
      room,
      query: {
        playerName: name
      }
    });

    // listen to the server's broadcasts (this.party.broadcast)
    this.socket?.addEventListener('message', (event) => {
      this.gameState = JSON.parse(event.data);
    });
  }

  leave() {
    if (this.socket) {
      this.socket?.removeEventListener('message', () => { });
      this.socket?.close();
      this.socket = undefined;
    }
  }

  emitPartyMessage(type: string = 'syncGameState') {
    if (!this.socket) return;

    if (type === 'syncGameState') {
      const parcel = JSON.stringify({
        message: {
          type,
          data: this.gameState
        },
        id: this.socket.id
      });
      this.socket.send(parcel);
    }

    if (type === 'syncPlayerState') {
      const parcel = JSON.stringify({
        message: {
          type,
          data: this.me
        },
        id: this.socket?.id
      });
      this.socket?.send(parcel);
    }

    if (type === 'resetGame') {
      const parcel = JSON.stringify({
        message: {
          type
        },
        id: this.socket?.id
      });
      this.socket?.send(parcel);
    }

  }

  startGame() {
    console.log('start game');
    if (!this.gameState) return;
    this.gameState.status = 'Playing';
    this.emitPartyMessage();
  }

  endGame() {
    if (!this.gameState) return;
    this.emitPartyMessage('syncPlayerState');
  }

  restartGame() {
    this.emitPartyMessage('resetGame');
  }

}

export const room = new Room();
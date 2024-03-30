import PartySocket from 'partysocket';
import type { GameState, Player } from '$lib/types';
import { randomArrayItem } from '$lib';
import { dev } from '$app/environment';

class Room {
  socket: PartySocket | undefined = $state();
  gameState: GameState = $state({
    status: 'Waiting',
    buttonCount: randomArrayItem([1, 4, 9, 16]),
    players: []
  });
  me: Player | undefined = $derived(this.gameState?.players.find((p) => p.id === this.socket?.id));
  isHost: Boolean = $derived(this.me?.id === this.gameState?.players[0]?.id);

  connect(room: string, name: string) {
    this.socket = new PartySocket({
      host: dev
        ? 'localhost:1999'
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

  disconnect() {
    if (this.socket) {
      this.socket?.removeEventListener('message', () => { });
      this.socket?.close();
      this.socket = undefined;
    }
  }

  sendToPartyServer(type: string = 'syncGameState') {
    if (this.socket) {
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
  }

  start() {
    if (!this.gameState) return;
    this.gameState.status = 'Playing';
    this.sendToPartyServer();
  }

  end() {
    if (!this.gameState) return;
    this.sendToPartyServer('syncPlayerState');
  }

  restart() {
    if (!this.gameState) return;
    this.gameState.status = 'Waiting';
    this.gameState.buttonCount = randomArrayItem([1, 4, 9, 16]);
    this.gameState.players.forEach((p) => {
      p.results = [];
    });
    this.sendToPartyServer();
  }

}

export const room = new Room();
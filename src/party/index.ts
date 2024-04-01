import type * as Party from "partykit/server";
import { getName, randomArrayItem, shuffle } from '$lib/utils';
import type { GameState } from '$lib/types';

export default class Server implements Party.Server {
  gameState: GameState;
  constructor(readonly party: Party.Room) {
    this.gameState = this.resetGame();
  }

  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    const params = new URLSearchParams(ctx.request.url);
    const player = {
      id: connection.id,
      userName: params.get("playerName") ?? getName(),
      results: []
    }
    this.gameState.players.push(player);

    const envelope = JSON.stringify(this.gameState);
    this.party.broadcast(envelope);
  }

  async onClose(connection: Party.Connection) {
    this.gameState.players = this.gameState.players.filter(player => player.id !== connection.id);
    this.party.broadcast(JSON.stringify(this.gameState));
  }

  resetGame(): GameState {
    const buttonCount = randomArrayItem([1, 4, 9, 16]);
    if (this.gameState?.players) {
      this.gameState.players.forEach((p) => {
        p.results = [];
      });
    }
    return {
      status: "Waiting",
      buttons: shuffle(
        Array(buttonCount)
          .fill({})
          .map((_, index) => ({ id: index + 1, lit: false }))
      ),
      players: this.gameState ? this.gameState.players : []
    }
  }

  onMessage(message: string, sender: Party.Connection) {
    let isReadyToBroadcast = false;
    const parcel = JSON.parse(message);

    switch (parcel.message.type) {
      case "resetGame":
        this.gameState = this.resetGame();
        isReadyToBroadcast = true;
        break;
      case "syncGameState":
        this.gameState = parcel.message.data;
        isReadyToBroadcast = true;
        break;
      case "syncPlayerState":
        let me = this.gameState.players.find(player => player.id === sender.id);
        if (me) me.results = [...parcel.message.data.results]
        const allDone = this.gameState.players.every((p) => p.results.length === this.gameState.buttons.length);
        if (allDone) {
          this.gameState.status = 'Results';
          isReadyToBroadcast = true;
        }
        break;

      default:
        break;
    }

    if (isReadyToBroadcast) {
      const envelope = JSON.stringify(this.gameState);
      this.party.broadcast(envelope);
    }
  }
}

Server satisfies Party.Worker;

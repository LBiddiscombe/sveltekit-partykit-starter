import type * as Party from "partykit/server";
import { getName } from './utils';

type Player = {
  id: string
  userName: string,
}

export default class Server implements Party.Server {
  players: Player[] = [];
  constructor(readonly party: Party.Room) { }

  onConnect(connection: Party.Connection) {
    const player = {
      id: connection.id,
      userName: getName()
    }
    this.players.push(player);

    const envelope = JSON.stringify(this.players);
    this.party.broadcast(envelope);
  }

  async onClose(connection: Party.Connection) {
    this.players = this.players.filter(player => player.id !== connection.id);

    const envelope = JSON.stringify(this.players);
    this.party.broadcast(envelope);
  }

  onMessage(message: string, sender: Party.Connection) {
    // get parcel sent from client by parsing 'message'
    const parcel: { message: string, username: string } = JSON.parse(message);

    // what we are sending back
    const envelope = JSON.stringify({
      content: `[ID: ${sender.id}] ${parcel.username}: ${parcel.message}`
    });

    // broadcast what was said to everyone
    this.party.broadcast(envelope);
  }
}

Server satisfies Party.Worker;
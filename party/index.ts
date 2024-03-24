import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) { }

  onConnect(connection: Party.Connection) {
    console.log('onConnect', connection)
    const envelope = JSON.stringify({
      content: `${connection.id} has connected!`
    });
    // when joining, broadcast what connection (ID) the client has
    this.party.broadcast(envelope);
  }

  async onClose(connection: Party.Connection) {
    console.log('onClose', connection)
    const envelope = JSON.stringify({
      content: `${connection.id} has disconnected!`
    });
    // when joining, broadcast what connection (ID) the client has
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
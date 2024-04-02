export type Player = {
  id: string;
  userName: string;
  results: number[];
}

type Button = {
  id: number;
  lit: boolean;
}

export type GameState = {
  status: "Waiting" | "Playing" | "Results";
  buttons: Button[];
  players: Player[];
}

export type PartyMessage = "syncGameState" | "syncPlayerState" | "resetGame"; 
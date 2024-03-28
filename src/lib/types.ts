export type Player = {
  id: string
  userName: string,
  results: Number[]
}

export type GameState = {
  status: "Waiting" | "Playing" | "Results";
  buttonCount: number;
  players: Player[]
}

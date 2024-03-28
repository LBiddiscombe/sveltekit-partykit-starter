type Player = {
  id: string
  userName: string,
  results: Number[]
}

type GameState = {
  status: "Waiting" | "Playing" | "Results";
  players: Player[]
}

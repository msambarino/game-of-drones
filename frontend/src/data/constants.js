export const DEFAULT_RULES = {
  moves: [
    { move: 'rock', kills: 'scissors' },
    { move: 'paper', kills: 'rock' },
    { move: 'scissors', kills: 'paper' }
  ],
  roundWinsRequired: 3
}

export const ROUND_RESULTS = {
  DRAW: 'DRAW',
  PLAYER_1_WINS: 'PLAYER_1_WINS',
  PLAYER_2_WINS: 'PLAYER_2_WINS'
}

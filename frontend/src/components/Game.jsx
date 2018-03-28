import React from 'react'
import { ROUND_RESULTS } from 'data/constants'
import Definition from './Definition'
import Result from './Result'
import Round from './Round'

const calculateRoundResult = (player1Move, player2Move, moves) => {
  return moves.reduce((result, rule) => {
    if (result === ROUND_RESULTS.DRAW) {
      if (rule.move === player1Move && rule.kills === player2Move) {
        return ROUND_RESULTS.PLAYER_1_WINS
      } else if (rule.move === player2Move && rule.kills === player1Move) {
        return ROUND_RESULTS.PLAYER_2_WINS
      } else {
        return result
      }
    } else {
      return result
    }
  }, ROUND_RESULTS.DRAW)
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false
    }

    this.handleGameStart = this.handleGameStart.bind(this)
    this.handlePlayRound = this.handlePlayRound.bind(this)
    this.restart = this.restart.bind(this)
  }

  handleGameStart(gameDefinition) {
    this.setState({
      playing: true,
      player1: gameDefinition.player1,
      player2: gameDefinition.player2,
      rules: gameDefinition.rules,
      rounds: [],
      player1Wins: 0,
      player2Wins: 0,
      player1Won: false,
      player2Won: false
    })
  }

  handlePlayRound(player1Move, player2Move) {
    const result = calculateRoundResult(
      player1Move,
      player2Move,
      this.state.rules.moves
    )

    switch (result) {
      case ROUND_RESULTS.DRAW:
        this.setState({
          rounds: [...this.state.rounds, { player1Move, player2Move, result }]
        })
        break
      case ROUND_RESULTS.PLAYER_1_WINS:
        const player1Wins = this.state.player1Wins + 1
        this.setState({
          rounds: [...this.state.rounds, { player1Move, player2Move, result }],
          player1Wins,
          player1Won: player1Wins === this.state.rules.roundWinsRequired
        })
        break
      case ROUND_RESULTS.PLAYER_2_WINS:
        const player2Wins = this.state.player2Wins + 1
        this.setState({
          rounds: [...this.state.rounds, { player1Move, player2Move, result }],
          player2Wins,
          player2Won: player2Wins === this.state.rules.roundWinsRequired
        })
        break
      default:
        break
    }
  }

  restart() {
    this.setState({
      playing: false,
      player1: null,
      player2: null,
      rounds: [],
      player1Wins: 0,
      player2Wins: 0,
      player1Won: false,
      player2Won: false
    })
  }

  render() {
    const {
      playing,
      player1,
      player2,
      player1Won,
      player2Won,
      rounds,
      rules
    } = this.state

    if (playing) {
      if (player1Won || player2Won) {
        return (
          <Result
            player1={player1}
            player2={player2}
            winner={player1Won ? player1 : player2}
            handlePlayAgain={this.restart}
          />
        )
      } else {
        return (
          <Round
            player1={player1}
            player2={player2}
            rounds={rounds}
            handlePlayRound={this.handlePlayRound}
            moves={rules.moves}
          />
        )
      }
    } else {
      return <Definition handleGameStart={this.handleGameStart} />
    }
  }
}

export default Game

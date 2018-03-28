import React from 'react'
import PropTypes from 'prop-types'
import { ROUND_RESULTS } from 'data/constants'

const formatRoundWinner = (player1, player2, result) => {
  switch (result) {
    case ROUND_RESULTS.DRAW:
      return '--'
    case ROUND_RESULTS.PLAYER_1_WINS:
      return player1
    case ROUND_RESULTS.PLAYER_2_WINS:
      return player2
    default:
      return null
  }
}

const Score = ({ rounds, player1, player2 }) => (
  <table className="table is-hoverable">
    <thead>
      <tr>
        <th>Round</th>
        <th>{`${player1}'s move`}</th>
        <th>{`${player2}'s move`}</th>
        <th>Winner</th>
      </tr>
    </thead>
    <tbody>
      {rounds.map((round, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{round.player1Move}</td>
          <td>{round.player2Move}</td>
          <td>{formatRoundWinner(player1, player2, round.result)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

Score.propTypes = {
  rounds: PropTypes.array.isRequired,
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired
}

export default Score

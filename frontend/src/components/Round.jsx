import React from 'react'
import PropTypes from 'prop-types'
import Score from './Score'

class Round extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isPlayer1Turn: true,
      player1Move: this.props.moves[0].move,
      player2Move: this.props.moves[0].move
    }

    this.handleMoveChange = this.handleMoveChange.bind(this)
    this.handleOkClick = this.handleOkClick.bind(this)
    this._reset = this._reset.bind(this)
  }

  handleMoveChange(event) {
    if (this.state.isPlayer1Turn) {
      this.setState({ player1Move: event.target.value })
    } else {
      this.setState({ player2Move: event.target.value })
    }
  }

  handleOkClick() {
    if (this.state.isPlayer1Turn) {
      this.setState({ isPlayer1Turn: false })
    } else {
      this._reset()
      this.props.handlePlayRound(this.state.player1Move, this.state.player2Move)
    }
  }

  _reset() {
    this.setState({
      isPlayer1Turn: true,
      player1Move: this.props.moves[0].move,
      player2Move: this.props.moves[0].move
    })
  }

  render() {
    const { rounds, moves, player1, player2 } = this.props
    const { isPlayer1Turn, player1Move, player2Move } = this.state

    const player = isPlayer1Turn ? player1 : player2
    const selectedMove = isPlayer1Turn ? player1Move : player2Move
    const round = rounds.length + 1

    return (
      <div className="container">
        <section className="section is-small columns">
          <div className="column">
            <h1 className="title">{`Round ${round}`}</h1>
            <h3 className="subtitle">{`${player}'s Turn`}</h3>
            <div className="field is-horizontal">
              <label className="label field-label is-normal">
                Select Move:
              </label>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        onChange={this.handleMoveChange}
                        value={selectedMove}
                      >
                        {moves.map(move => (
                          <option key={move.move} value={move.move}>
                            {move.move}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={this.handleOkClick}
              >
                Ok
              </button>
            </div>
          </div>
          <div className="column">
            <h3 className="subtitle">Score</h3>
            <Score player1={player1} player2={player2} rounds={rounds} />
          </div>
        </section>
      </div>
    )
  }
}

Round.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  moves: PropTypes.array.isRequired,
  rounds: PropTypes.array.isRequired,
  handlePlayRound: PropTypes.func.isRequired
}

export default Round

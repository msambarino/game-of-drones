import React from 'react'
import PropTypes from 'prop-types'
import { DEFAULT_RULES } from 'data/constants'

class Definition extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      useDefaultRules: true,
      rules: DEFAULT_RULES,
      player1: { value: '', error: null },
      player2: { value: '', error: null }
    }

    this.handlePlayer1Change = this.handlePlayer1Change.bind(this)
    this.handlePlayer2Change = this.handlePlayer2Change.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this._checkFieldValues = this._checkFieldValues.bind(this)
  }

  handlePlayer1Change(event) {
    const value = event.target.value
    this.setState({
      player1: { value, error: value === '' ? "Can't be blank" : null },
      player2: {
        ...this.state.player2,
        error:
          this.state.player1.value === this.state.player2.value &&
          value !== this.state.player2.value &&
          this.state.player2.value !== ''
            ? null
            : this.state.player2.error
      }
    })
  }

  handlePlayer2Change(event) {
    const value = event.target.value
    this.setState({
      player2: {
        value,
        error:
          value === ''
            ? "Can't be blank"
            : value === this.state.player1.value
              ? "Can't be the same as player 1"
              : null
      }
    })
  }

  handleStartClick() {
    const errors = this._checkFieldValues()
    if (errors.player1 || errors.player2) {
      this.setState({
        player1: {
          ...this.state.player1,
          error: errors.player1
        },
        player2: {
          ...this.state.player2,
          error: errors.player2
        }
      })
    } else {
      this.props.handleGameStart({
        player1: this.state.player1.value,
        player2: this.state.player2.value,
        rules: this.state.rules
      })
    }
  }

  _checkFieldValues() {
    return {
      player1: this.state.player1.value === '' ? "Can't be blank" : null,
      player2:
        this.state.player2.value === ''
          ? "Can't be blank"
          : this.state.player2.value === this.state.player1.value
            ? "Can't be the same as player 1"
            : null
    }
  }

  render() {
    const { player1, player2 } = this.state
    return (
      <div className="container">
        <section className="section is-small columns is-centered">
          <div className="column is-half">
            <h3 className="title has-text-centered">Enter Player's Names</h3>
            <div className="field">
              <label className="label is-normal">Player 1</label>
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${player1.error && 'is-danger'}`}
                    type="text"
                    placeholder="Player 1 name"
                    value={player1.value}
                    onChange={this.handlePlayer1Change}
                  />
                  {player1.error ? (
                    <p className="help is-danger">{player1.error}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="field">
              <label className=" label is-normal">Player 2</label>
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${player2.error && 'is-danger'}`}
                    type="text"
                    placeholder="Player 2 name"
                    value={player2.value}
                    onChange={this.handlePlayer2Change}
                  />
                  {player2.error ? (
                    <p className="help is-danger">{player2.error}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="control">
              <button
                className="button is-primary is-fullwidth"
                onClick={this.handleStartClick}
              >
                Start
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

Definition.propTypes = {
  handleGameStart: PropTypes.func.isRequired
}

export default Definition

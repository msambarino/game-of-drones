import React from 'react'
import PropTypes from 'prop-types'
import { registerScore } from 'services/api'

class Result extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null
    }
  }

  componentDidMount() {
    const { player1, player2, winner } = this.props
    this.setState({ loading: true, error: null })

    registerScore(player1, player2, winner)
      .then(response => this.setState({ loading: false }))
      .catch(error => this.setState({ error: true }))
  }

  render() {
    const { winner, handlePlayAgain } = this.props
    const { error } = this.state
    return (
      <div>
        {error ? (
          <div class="notification is-danger">Unable to register score</div>
        ) : null}
        <div className="container">
          <section className="section has-text-centered">
            <h1 className="title">WE HAVE A WINNER!!!</h1>
            <h2 className="subtitle">
              <strong>{winner}</strong> is the new EMPEROR!
            </h2>
            <button className="button is-primary" onClick={handlePlayAgain}>
              Play Again
            </button>
          </section>
        </div>
      </div>
    )
  }
}

Result.propTypes = {
  player1: PropTypes.string.isRequired,
  player2: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  handlePlayAgain: PropTypes.func.isRequired
}

export default Result

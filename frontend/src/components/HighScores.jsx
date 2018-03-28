import React from 'react'
import { fetchHighScores } from 'services/api'
import { Link } from 'react-router-dom'

class HighScores extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      error: null,
      ranking: []
    }

    this.renderScores = this.renderScores.bind(this)
  }

  componentDidMount() {
    this.setState({ loading: true })

    fetchHighScores()
      .then(response =>
        this.setState({ loading: false, ranking: response.data.data })
      )
      .catch(error => this.setState({ loading: false, error: true }))
  }

  renderScores() {
    const ranking = this.state.ranking
    return ranking && ranking.length > 0 ? (
      <div className="columns is-centered">
        <div className="column is-half">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th />
                <th>Player</th>
                <th>Games won</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((rank, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{rank.player}</td>
                  <td>{rank.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>
        <span>We didn't find any scores, </span>
        <Link to="/">Go play some games!</Link>
      </div>
    )
  }

  render() {
    const { loading, error } = this.state
    return (
      <div>
        {error ? (
          <div className="notification is-danger">
            Unable to fetch high scores
          </div>
        ) : null}
        <div className="container">
          <section className="section has-text-centered">
            <h1 className="title is-loading">High Scores</h1>
            {loading ? (
              <div className="loader" style={{ margin: 'auto' }} />
            ) : error ? null : (
              this.renderScores()
            )}
          </section>
        </div>
      </div>
    )
  }
}

export default HighScores

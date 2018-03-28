import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import Game from './Game'
import HighScores from './HighScores'

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-primary" aria-label="main navigation">
          <div className="navbar-brand">
            <h3 className="navbar-item is-size-5 has-text-weight-bold">
              GAME OF DRONES
            </h3>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/high-scores" className="navbar-item">
                High Scores
              </Link>
            </div>
          </div>
        </nav>
        <div>
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="/high-scores" component={HighScores} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App

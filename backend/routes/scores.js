var express = require('express')
var db = require('../db')
var router = express.Router()

/* Returns players ranking. */
router.get('/', function(req, res, next) {
  db
    .query(
      'SELECT winner AS player, count(*) FROM games GROUP BY winner ORDER BY count DESC',
      []
    )
    .then(result => res.json({ data: result.rows }))
    .catch(err => next(err))
})

/* Register a won game */
router.post('/', function(req, res, next) {
  const { player1, player2, winner } = req.body
  if (!player1 || !player2 || !winner) {
    res.status(400).json({
      error: 'missing parameters. player1, player2 and winner are required.'
    })
  } else {
    db
      .query(
        'INSERT INTO games(player1, player2, winner) VALUES ($1, $2, $3)',
        [player1, player2, winner]
      )
      .then(result => res.sendStatus(201))
      .catch(err => next(err))
  }
})

module.exports = router

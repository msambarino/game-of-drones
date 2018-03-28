var expect = require('chai').expect
var request = require('supertest')
var app = require('../app')
var db = require('../db')

describe('/scores', () => {
  before(() => {
    db.query(
      'INSERT INTO games(player1, player2, winner) VALUES ($1, $2, $3)',
      ['p1', 'p2', 'p1']
    )
    db.query(
      'INSERT INTO games(player1, player2, winner) VALUES ($1, $2, $3)',
      ['p1', 'p2', 'p1']
    )
    db.query(
      'INSERT INTO games(player1, player2, winner) VALUES ($1, $2, $3)',
      ['p1', 'p2', 'p2']
    )
  })

  after(() => {
    db.query('TRUNCATE TABLE games')
  })

  describe('when fetching scores', () => {
    it('should send back a JSON object containing players game rankings', done => {
      request(app)
        .get('/scores')
        .expect(
          200,
          {
            data: [{ player: 'p1', count: 2 }, { player: 'p2', count: 1 }]
          },
          done
        )
    })
  })

  describe('when registering a game', () => {
    it('should return 400 if player1 param is missing in body', done => {
      request(app)
        .post('/scores')
        .set('Content-Type', 'application/json')
        .send({ player2: 'p2', winner: 'p2' })
        .expect(400, done)
    })

    it('should return 400 if player2 param is missing in body', done => {
      request(app)
        .post('/scores')
        .set('Content-Type', 'application/json')
        .send({ player1: 'p1', winner: 'p2' })
        .expect(400, done)
    })

    it('should return 400 if winner param is missing in body', done => {
      request(app)
        .post('/scores')
        .set('Content-Type', 'application/json')
        .send({ player1: 'p1', player2: 'p2' })
        .expect(400, done)
    })

    it('should return 201 all params are present', done => {
      request(app)
        .post('/scores')
        .set('Content-Type', 'application/json')
        .send({ player1: 'AA', player2: 'BB', winner: 'AA' })
        .expect(201, done)
    })
  })
})

var express = require('express')
var path = require('path')
var logger = require('morgan')

var scoresRouter = require('./routes/scores')

var app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/scores', scoresRouter)

module.exports = app

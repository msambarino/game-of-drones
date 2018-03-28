import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { DEFAULT_RULES } from 'data/constants'
import Game from './Game'
import Definition from './Definition'
import Round from './Round'
import Result from './Result'

test('snapshot test', () => {
  const component = shallow(<Game />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('should initially render a Definition component', () => {
  const component = shallow(<Game />)
  expect(component.find(Definition)).toHaveLength(1)
})

test('should render a Round component after starting game', () => {
  const component = shallow(<Game />)
  const instance = component.instance()

  instance.handleGameStart({
    player1: 'p1',
    player2: 'p2',
    rules: DEFAULT_RULES
  })
  component.update()

  expect(component.find(Round)).toHaveLength(1)
})

test('should render a Round component until the game is won', () => {
  const component = shallow(<Game />)
  const instance = component.instance()

  instance.handleGameStart({
    player1: 'p1',
    player2: 'p2',
    rules: DEFAULT_RULES
  })

  const winningMove = DEFAULT_RULES.moves[0].move
  const losingMove = DEFAULT_RULES.moves[0].kills
  var roundsPlayed = 0

  while (roundsPlayed < DEFAULT_RULES.roundWinsRequired - 1) {
    instance.handlePlayRound(winningMove, losingMove)
    component.update()
    expect(component.find(Round)).toHaveLength(1)

    roundsPlayed = roundsPlayed + 1
  }

  instance.handlePlayRound(winningMove, losingMove)
  component.update()

  expect(component.find(Round)).toHaveLength(0)
})

test('should render a Result component when the game is won', () => {
  const component = shallow(<Game />)
  const instance = component.instance()

  instance.handleGameStart({
    player1: 'p1',
    player2: 'p2',
    rules: DEFAULT_RULES
  })

  const winningMove = DEFAULT_RULES.moves[0].move
  const losingMove = DEFAULT_RULES.moves[0].kills
  var roundsPlayed = 0

  while (roundsPlayed < DEFAULT_RULES.roundWinsRequired) {
    instance.handlePlayRound(winningMove, losingMove)
    roundsPlayed = roundsPlayed + 1
  }
  component.update()

  expect(component.find(Result)).toHaveLength(1)
})

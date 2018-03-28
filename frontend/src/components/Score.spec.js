import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { ROUND_RESULTS, DEFAULT_RULES } from 'data/constants'
import Score from './Score'

test('snapshot test', () => {
  const move = DEFAULT_RULES.moves[0].move
  const rounds = [
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move },
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move },
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move }
  ]

  const component = shallow(<Score rounds={rounds} player1="p1" player2="p2" />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('renders a row for each round', () => {
  const move = DEFAULT_RULES.moves[0].move
  const rounds = [
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move },
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move },
    { result: ROUND_RESULTS.DRAW, player1Move: move, player2Move: move }
  ]

  const component = shallow(<Score rounds={rounds} player1="p1" player2="p2" />)

  expect(component.find('tbody > tr')).toHaveLength(3)
})

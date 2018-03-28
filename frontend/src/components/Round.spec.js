import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import { DEFAULT_RULES } from '../data/constants'
import Round from './Round'
import Score from './Score'

test('snapshot test', () => {
  const component = shallow(
    <Round
      player1="p1"
      player2="p2"
      rounds={[]}
      moves={DEFAULT_RULES.moves}
      handlePlayRound={jest.fn()}
    />
  )
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('should render a Score component', () => {
  const component = shallow(
    <Round
      player1="p1"
      player2="p2"
      rounds={[]}
      moves={DEFAULT_RULES.moves}
      handlePlayRound={jest.fn()}
    />
  )

  expect(component.find(Score)).toHaveLength(1)
})

test("should be player2's turn after player1 selects his move", () => {
  const component = shallow(
    <Round
      player1="p1"
      player2="p2"
      rounds={[]}
      moves={DEFAULT_RULES.moves}
      handlePlayRound={jest.fn()}
    />
  )
  const instance = component.instance()

  expect(instance.state.isPlayer1Turn).toBe(true)
  component.find('button').simulate('click')
  expect(instance.state.isPlayer1Turn).toBe(false)
})

test('should compute round after both players select their moves', () => {
  const playRoundMock = jest.fn()
  const component = shallow(
    <Round
      player1="p1"
      player2="p2"
      rounds={[]}
      moves={DEFAULT_RULES.moves}
      handlePlayRound={playRoundMock}
    />
  )

  component.find('button').simulate('click')
  component.find('button').simulate('click')

  expect(playRoundMock).toHaveBeenCalled()
})

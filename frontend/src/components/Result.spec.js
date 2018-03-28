import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Result from './Result'
import { registerScore } from 'services/api'

jest.mock('services/api', () => ({
  registerScore: jest.fn(() => {
    return Promise.resolve({})
  })
}))

test('snapshot test', () => {
  const component = shallow(
    <Result player1="p1" player2="p2" winner="p1" handlePlayAgain={jest.fn()} />
  )
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('should register score when mounted', () => {
  const component = shallow(
    <Result player1="p1" player2="p2" winner="p1" handlePlayAgain={jest.fn()} />
  )
  expect(registerScore).toHaveBeenCalled()
})

test('should call handlePlayAgain when play again button is clicked', () => {
  const playAgainMock = jest.fn()
  const component = shallow(
    <Result
      player1="p1"
      player2="p2"
      winner="p1"
      handlePlayAgain={playAgainMock}
    />
  )

  component.find('button').simulate('click')

  expect(playAgainMock).toHaveBeenCalled()
})

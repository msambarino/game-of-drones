import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import Definition from './Definition'

test('snapshot test', () => {
  const component = shallow(<Definition handleGameStart={() => {}} />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('should not start game if player names are not valid', () => {
  const component = shallow(<Definition handleGameStart={() => {}} />)
  component.find('button').simulate('click')

  expect(component.find('.help.is-danger')).toHaveLength(2)
})

test('should show error message if player name is blank', () => {
  const component = shallow(<Definition handleGameStart={() => {}} />)
  component
    .find('input')
    .first()
    .simulate('change', { target: { value: '' } })

  expect(component.find('.help.is-danger').text()).toBeTruthy()
})

test('should show error message if players names are the same', () => {
  const component = shallow(<Definition handleGameStart={() => {}} />)
  component
    .find('input')
    .forEach(input => input.simulate('change', { target: { value: 'p1' } }))

  expect(component.find('.help.is-danger').text()).toBeTruthy()
})

test('should start game after start button is clicked if players names are valid', () => {
  const gameStartMock = jest.fn()
  const component = shallow(<Definition handleGameStart={gameStartMock} />)
  component
    .find('input')
    .forEach((input, index) =>
      input.simulate('change', { target: { value: `p${index}` } })
    )

  component.find('button').simulate('click')
  expect(gameStartMock).toHaveBeenCalled()
})

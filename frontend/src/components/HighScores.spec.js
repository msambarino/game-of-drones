import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import HighScores from './HighScores'
import { fetchHighScores } from 'services/api'

jest.mock('services/api', () => ({
  fetchHighScores: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          {
            player: 'p1',
            count: 10
          },
          {
            player: 'p2',
            count: 3
          },
          {
            player: 'p3',
            count: 2
          }
        ]
      }
    })
  )
}))

test('snapshot test', () => {
  const component = shallow(<HighScores />)
  const tree = shallowToJson(component)
  expect(tree).toMatchSnapshot()
})

test('shoud fetch high scores when mounted', () => {
  const component = shallow(<HighScores />)
  expect(fetchHighScores).toHaveBeenCalled()
})

test('should render a row for each high score', async () => {
  const component = shallow(<HighScores />)
  await component.instance().componentDidMount()
  component.update()
  expect(component.instance().state.ranking).toHaveLength(3)
  expect(component.find('tbody > tr')).toHaveLength(3)
})

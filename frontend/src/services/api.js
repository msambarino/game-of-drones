import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER

export const fetchHighScores = () => {
  return axios.get('/scores')
}

export const registerScore = (player1, player2, winner) => {
  return axios.post('/scores', { player1, player2, winner })
}

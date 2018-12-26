import { SET_USER } from './actionTypes'

export const setUser = token => ({
  type: SET_USER,
  payload: {
    token: token
  }
})

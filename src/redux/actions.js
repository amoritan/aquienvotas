import { AUTHENTICATE, UPDATE } from './actionTypes'

export const authenticate = authentication => ({
  type: AUTHENTICATE,
  payload: {
    token: authentication.token,
    user: authentication.user
  }
})

export const update = updating => ({
  type: UPDATE,
  payload: {
    user: updating.user
  }
})

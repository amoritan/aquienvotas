import { AUTHENTICATE } from './actionTypes'

export const authenticate = authentication => ({
  type: AUTHENTICATE,
  payload: {
    token: authentication.token,
    user: authentication.user
  }
})

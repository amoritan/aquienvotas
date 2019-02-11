import { AUTHENTICATE, UPDATE } from '../actionTypes'
import axios from 'axios'

const initialState = {
  token: null,
  user: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE: {
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
      window.localStorage.setItem('authentication_token', action.payload.token)
      return {
        token: action.payload.token,
        user: action.payload.user
      }
    }
    case UPDATE: {
      return {
        user: action.payload.user
      }
    }
    default: {
      return state
    }
  }
}

export default user

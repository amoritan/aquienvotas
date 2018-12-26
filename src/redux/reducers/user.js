import { SET_USER } from '../actionTypes'

const initialState = {
  token: null
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.payload.token
    }
    default: {
      return state
    }
  }
}

export default user

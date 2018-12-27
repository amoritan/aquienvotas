import { AUTHENTICATE } from '../actionTypes'
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
    // case FETCH_USER: {
    //   axios.get('/authentication/fetch', { headers: {'Authorization': `Bearer ${state.token}`} }).then(response => {
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    //     return {
    //       ...state,
    //       user: response.data
    //     }
    //   }).catch( error => {
    //     if (error.response.status === 401) {
    //       return {
    //         token: null,
    //         user: {}
    //       }
    //     } else {
    //       console.error(error)
    //       return state
    //     }
    //   })
    // }
    default: {
      return state
    }
  }
}

export default user

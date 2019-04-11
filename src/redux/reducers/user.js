////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////                                                                                ////
////  This file is part of AQuienVotas.                                             ////
////                                                                                ////
////  AQuienVotas is free software: you can redistribute it and/or modify           ////
////  it under the terms of the GNU Affero General Public License as published by   ////
////  the Free Software Foundation, either version 3 of the License, or             ////
////  any later version.                                                            ////
////                                                                                ////
////  AQuienVotas is distributed in the hope that it will be useful,                ////
////  but WITHOUT ANY WARRANTY; without even the implied warranty of                ////
////  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                  ////
////  GNU Affero General Public License for more details.                           ////
////                                                                                ////
////  You should have received a copy of the GNU Affero General Public License      ////
////  along with AQuienVotas. If not, see <https://www.gnu.org/licenses/>.          ////
////                                                                                ////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



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

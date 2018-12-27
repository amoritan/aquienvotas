import React, { Component } from 'react'
import Voting from './components/Voting'
import Authentication from './components/Authentication'
import { connect } from 'react-redux'
import { authenticate } from './redux/actions'
import { getToken } from './redux/selectors'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.checkAuthentication = this.checkAuthentication.bind(this)
  }

  checkAuthentication() {
    const token = window.localStorage.getItem('authentication_token')
    if (token) {
      axios.get('/authentication/fetch', { headers: {'Authorization': `Bearer ${token}`} }).then(response => {
        this.props.authenticate({ token: token, user: response.data })
      }).catch( error => {
        if (error.response.status === 401) {
          window.localStorage.removeItem('authentication_token')
        } else {
          console.error(error)
        }
      })
    }
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  render() {
    return (
      <main>
        <Voting name="Elección nacional" endpoint="national" />
        { this.props.token ? '' : <Authentication />}
      </main>
    )
  }
}

export default connect(state => ({ token: getToken(state) }), { authenticate })(App)

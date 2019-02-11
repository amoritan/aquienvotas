import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import Header from './components/sections/Header'
import Voting from './components/sections/Voting'
import Province from './components/sections/Province'

import { authenticate } from './redux/actions'
import { getUser } from './redux/selectors'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }

    this.checkAuthentication = this.checkAuthentication.bind(this)
  }

  checkAuthentication() {
    let _this = this
    const token = window.localStorage.getItem('authentication_token')
    if (token) {
      axios.get('/authentication/fetch', { headers: {'Authorization': `Bearer ${token}`} }).then(response => {
        _this.props.authenticate({ token: token, user: response.data })
        _this.setState({ ready: true })
      }).catch( error => {
        if (error.response.status === 401) {
          window.localStorage.removeItem('authentication_token')
          _this.setState({ ready: true })
        } else {
          console.error(error)
        }
      })
    } else {
      _this.setState({ ready: true })
    }
  }

  componentDidMount() {
    this.checkAuthentication()
  }

  render() {
    if (this.state.ready) {
      return (
        <main>
          <Header closed={ Boolean(this.props.user) }></Header>
          <Voting name="Elección nacional" endpoint="national" />
          { this.props.user && this.props.user.location ? <Voting name="Elección provincial" endpoint="local" /> : <Province /> }
        </main>
      )
    } else {
      return ''
    }
  }
}

export default connect(state => ({ user: getUser(state) }), { authenticate })(App)

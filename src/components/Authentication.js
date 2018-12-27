import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../redux/actions'
import axios from 'axios'

class Authentication extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: '+54',
      phone: '',
      csrf: Math.random().toString(36).substr(2, 10)
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.initializeAccountKit = this.initializeAccountKit.bind(this)
    this.loginCallback = this.loginCallback.bind(this)
  }

  handleChange(event) {
    this.setState({phone: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const _this = this
    window.AccountKit.login(
      'PHONE', 
      {countryCode: _this.state.code, phoneNumber: _this.state.phone},
      _this.loginCallback
    )
  }

  componentDidMount() {
    this.initializeAccountKit()
  }

  initializeAccountKit() {
    const _this = this
    window.AccountKit_OnInteractive = function(){
      window.AccountKit.init(
        {
          appId: process.env.REACT_APP_ACCOUNT_KIT_APP_ID,
          state: _this.state.csrf, 
          version: 'v1.1',
          fbAppEventsEnabled: true
        }
      )
    }
  }

  loginCallback(response) {
    if (response.status === 'PARTIALLY_AUTHENTICATED') {
      if (response.state === this.state.csrf) {
        axios.post('/authentication/authenticate', {
          code: response.code
        }).then(response => {
          this.props.authenticate(response.data)
        }).catch(error => {
          console.error(error)
        })
      }
    }
    else if (response.status === 'NOT_AUTHENTICATED') {
      console.error(response)
    }
    else if (response.status === 'BAD_PARAMS') {
      console.error(response)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.code} disabled required />
        <input type="phone" value={this.state.phone} onChange={this.handleChange} placeholder="(Ej.: 1144445555)" required />
        <input type="submit" value="Authenticate" />
      </form>
    )
  }
}

export default connect(null, { authenticate })(Authentication)

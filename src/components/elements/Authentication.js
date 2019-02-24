import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShieldCheck, faUserSecret, faMoneyBillWave, faLock, faAd } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'

import { authenticate } from '../../redux/actions'

import Modal from './Modal'

library.add(faShieldCheck, faUserSecret, faMoneyBillWave, faLock, faAd)

const Container = styled.div`
  max-height: calc(100vh - 6em);
  & > svg {
    display: block;
    font-size: 3em;
    height: auto;
    margin: 0 auto;
  }
  h3 {
    color: #00d569;
    font-size: 1.5em;
    text-align: center;
    margin: .5em 0 1em 0;
  }
  form {
    input {
      padding: .5em;
      box-sizing: border-box;
      &[type=text], &[type=phone] {
        background: none;
        color: #1e1e1e;
        border: .0625em solid ${ lighten(.8, '#1e1e1e') };
      }
      &[type=text] {
        width: 20%;
        text-align: center;
        border-right: none;
        background: ${ lighten(.8, '#1e1e1e') };
      }
      &[type=phone] {
        width: 80%;
      }
      &[type=submit] {
        width: 100%;
        border: .125em solid #00d569;
        background: #00d569;
        color: #fefefe;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
  small {
    color: ${ lighten(.4, '#1e1e1e') };
  }
  ul {
    list-style: none;
    margin: 2em 0 0 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: .5em 0;
      color: #00d569;
      span {
        width: 90%;
        font-size: .8em;
        color: #1e1e1e;
      }
    }
  }
  svg {
    color: #00d569;
  }
  strong {
    font-weight: 600;
  }
`

class Authentication extends Component {
  constructor(props) {
    super(props)

    this.state = {
      code: '+54',
      phone: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    window.gtag('event', 'submitted', { event_category: 'authentication' })
  }

  componentDidMount() {
    window.gtag('event', 'started', { event_category: 'authentication' })
  }

  loginCallback(response) {
    if (response.status === 'PARTIALLY_AUTHENTICATED') {
      axios.post('/authentication/authenticate', {
        code: response.code
      }).then(response => {
        this.props.authenticate(response.data)
        window.gtag('event', 'validated', { event_category: 'authentication' })
        this.props.successHandler()
      }).catch(error => {
        console.error(error)
        alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        this.props.closeHandler()
      })
    }
    else if (response.status === 'NOT_AUTHENTICATED') {
      console.error(response)
      alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
      this.props.closeHandler()
    }
    else if (response.status === 'BAD_PARAMS') {
      console.error(response)
      alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
      this.props.closeHandler()
    }
  }

  render() {
    return (
      <Modal closeHandler={ this.props.closeHandler }>
        <Container>
          <FontAwesomeIcon icon="shield-check" />
          <p>Recibí en tu celular un código único para asegurar la veracidad de tu voto.</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input type="text" value={this.state.code} disabled required />
              <input type="phone" value={this.state.phone} onChange={this.handleChange} placeholder="1144445555" required />
            </div>
            <input type="submit" value="Verificar mi voto" />
          </form>
          <small>Ingresa tu número de télefono celular con código de área sin espacios ni guiones.</small>
          <ul>
            <li><FontAwesomeIcon icon="user-secret" /> <span><strong>Nuestro servidor no guarda tu número de teléfono.</strong> Usamos el código de verificación para construir un sistema seguro y resultados confiables.</span></li>
          </ul>
        </Container>
      </Modal>
    )
  }
}

Authentication.propTypes = {
  successHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired
}

export default connect(null, { authenticate })(Authentication)

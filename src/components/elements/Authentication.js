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



import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'
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
  color: #1e1e1e;
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
      &[type=text], &[type=tel] {
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
      &[type=tel] {
        width: 80%;
      }
      &[type=submit] {
        width: 100%;
        border: .125em solid #00d569;
        background: #00d569;
        color: #fefefe;
        font-weight: 700;
        cursor: pointer;
        &:disabled {
          opacity: .5;
          cursor: not-allowed;
        }
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
      phone: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.loginCallback = this.loginCallback.bind(this)
  }

  handleChange(event) {
    const numbers = /^[0-9\b]+$/
    if ((event.target.value === '' || numbers.test(event.target.value)) && event.target.value.length <= 12) {
      this.setState({phone: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const _this = this

    const phoneNumber = _this.state.phone.charAt(0) === '9' ? _this.state.phone : `9${_this.state.phone}`
    const phoneNumberParse = parsePhoneNumberFromString(phoneNumber, 'AR')

    if (phoneNumberParse && phoneNumberParse.isValid() && phoneNumberParse.getType() === 'MOBILE') {
      _this.setState({ submitted: true })
      window.AccountKit.login(
        'PHONE', 
        {countryCode: _this.state.code, phoneNumber: phoneNumber},
        _this.loginCallback
      )
      window.gtag('event', 'submitted', { event_category: 'authentication' })
    } else {
      alert('Revisá que tu número de télefono celular tenga el código de área sin el cero y sin el quince.')
    }
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
          <p>Antes de sumar tu voto tenemos que verificar que sea único enviando gratis un código a tu celular.</p>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input type="text" value={this.state.code} disabled required />
              <input type="tel" value={this.state.phone} onChange={this.handleChange} placeholder="1144445555" required />
            </div>
            <input type="submit" value="Verificar mi voto" disabled={ this.state.submitted } />
          </form>
          <small>Ingresa tu número de télefono celular con código de área sin el cero y sin el quince. Tampoco tiene que tener espacios o guiones.</small>
          <ul>
            <li><FontAwesomeIcon icon="user-secret" /> <span><strong>No recibimos ni guardamos tu número de teléfono.</strong> Usamos el código de verificación para construir un sistema anónimo, seguro y con resultados confiables.</span></li>
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

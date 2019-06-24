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



import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'

import styled from 'styled-components'
import { lighten } from 'polished'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShieldAlt, faUserSecret, faMoneyBillWave, faLock, faAd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SessionContext from '../../SessionContext'

import Modal from './Modal'

library.add(faShieldAlt, faUserSecret, faMoneyBillWave, faLock, faAd)

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

function Authentication(props) {
  const code = '+54'
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const session = useContext(SessionContext)

  useEffect(() => {
    window.gtag('event', 'started', { event_category: 'authentication' })
  }, [])

  useEffect(() => {
    if (session.user) { props.successHandler() }
  }, [session.user, props])

  function handleChange(event) {
    const numbers = /^[0-9\b]+$/
    if ((event.target.value === '' || numbers.test(event.target.value)) && event.target.value.length <= 12) {
      setPhone(event.target.value)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const phoneNumber = phone.charAt(0) === '9' ? phone : `9${phone}`
    const phoneNumberParse = parsePhoneNumberFromString(phoneNumber, 'AR')

    if (phoneNumberParse && phoneNumberParse.isValid() && phoneNumberParse.getType() === 'MOBILE') {
      setSubmitted(true)
      window.AccountKit.login(
        'PHONE', 
        {countryCode: code, phoneNumber: phoneNumber},
        loginCallback
      )
      window.gtag('event', 'submitted', { event_category: 'authentication' })
    } else {
      alert('Revisá que tu número de télefono celular tenga el código de área sin el cero y sin el quince.')
    }
  }

  function loginCallback(response) {
    if (response.status === 'PARTIALLY_AUTHENTICATED') {
      axios.post('/authentication/authenticate', {
        code: response.code
      }).then(response => {
        session.set(response.data.user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        window.localStorage.setItem('authentication_token', response.data.token)
        window.gtag('event', 'validated', { event_category: 'authentication' })
      }).catch(error => {
        console.error(error)
        alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        props.closeHandler()
      })
    }
    else if (response.status === 'NOT_AUTHENTICATED') {
      console.error(response)
      alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
      props.closeHandler()
    }
    else if (response.status === 'BAD_PARAMS') {
      console.error(response)
      alert('Ha ocurrido un error al verificar tu voto. Vuelve a intentarlo en unos minutos.')
      props.closeHandler()
    }
  }

  return (
    <Modal closeHandler={ props.closeHandler }>
      <Container>
        <FontAwesomeIcon icon="shield-alt" />
        <p>Antes de sumar tu voto tenemos que verificar que sea único enviando gratis un código a tu celular.</p>
        <form onSubmit={ handleSubmit }>
          <div>
            <input type="text" value={ code } disabled required />
            <input type="tel" value={ phone } onChange={ handleChange } placeholder="1144445555" required />
          </div>
          <input type="submit" value="Verificar mi voto" disabled={ submitted } />
        </form>
        <small>Ingresa tu número de télefono celular con código de área sin el cero y sin el quince. Tampoco tiene que tener espacios o guiones.</small>
        <ul>
          <li><FontAwesomeIcon icon="user-secret" /> <span><strong>No recibimos ni guardamos tu número de teléfono.</strong> Usamos el código de verificación para construir un sistema anónimo, seguro y con resultados confiables.</span></li>
        </ul>
      </Container>
    </Modal>
  )
}

Authentication.propTypes = {
  successHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired
}

export default Authentication

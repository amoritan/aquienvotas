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



import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import axios from 'axios'

import Header from './components/sections/Header'
import Voting from './components/sections/Voting'
import Province from './components/sections/Province'
import Demographics from './components/sections/Demographics'
import Polls from './components/sections/Polls'
import About from './components/sections/About'
import FrequentlyAskedQuestions from './components/sections/FrequentlyAskedQuestions'
import Footer from './components/sections/Footer'

import NextStepIndicator from './components/elements/NextStepIndicator'

import { authenticate } from './redux/actions'
import { getUser } from './redux/selectors'

const MainContainer = styled.main`
  @media (min-width: 64rem) {
    font-size 1.25em;
  }
  @media (min-width: 96rem) {
    font-size 1.5em;
  }
`

function App(props) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    checkAuthentication()
  }, [])

  function checkAuthentication() {
    const token = window.localStorage.getItem('authentication_token')
    if (token) {
      axios.get('/authentication/fetch', { headers: {'Authorization': `Bearer ${token}`} }).then(response => {
        props.authenticate({ token: token, user: response.data })
        setReady(true)
      }).catch( error => {
        if (error.response && error.response.status === 401) {
          window.localStorage.removeItem('authentication_token')
          setReady(false)
        } else {
          console.error(error)
          window.gtag('event', 'api', { event_category: 'error', event_label: error })
        }
      })
    } else {
      setReady(true)
    }
  }

  if (ready) {
    return (
      <MainContainer>
        <Header closed={ Boolean(props.user) }></Header>
        <Voting name="Presidente" endpoint="national" />
        { props.user && props.user.location ? (
          <Voting name="Gobernador/a" endpoint="local" />
        ) : <Province /> }
        <Demographics />
        <Polls />
        <About />
        <FrequentlyAskedQuestions />
        <Footer />
        { props.user && props.user.votes.length === 1 ? (
          <NextStepIndicator action="¡Ya podes votar en la elección provincial!" destination="local" />
        ) : (
          props.user && props.user.votes.length === 2 && !props.user.age ? (
            <NextStepIndicator action="¡Ahora podes conocer a la comunidad de #AQuienVotas!" destination="demographics" />
          ) : props.user && !props.user.votes.find(vote => vote.voting_type === 'Poll') ? (
            <NextStepIndicator action="¡Nueva encuesta! ¿Quién fue el/la mejor presidente desde el regreso de la democracia?" destination="polls" />
          ) : ''
        ) }
      </MainContainer>
    )
  } else {
    return ''
  }
}

export default connect(state => ({ user: getUser(state) }), { authenticate })(App)

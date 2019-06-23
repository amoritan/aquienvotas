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



import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { animateScroll } from 'react-scroll'

import axios from 'axios'

import Authentication from './Authentication'
import Share from './Share'
import Option from './Option'
import OptionResult from './OptionResult'

import Section from '../styled/Section'
import SectionTitle from '../styled/SectionTitle'

const Options = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 .5rem;
  padding: 0;
`
const Results = styled.ul`
  list-style: none;
  margin: 0 .5rem;
  padding: 0 1rem;
`

function Poll(props) {

  const [poll, setPoll] = useState({
    id: props.data.id,
    name: props.data.name,
    options: props.data.poll_options || [],
    results: props.data.poll_options_with_results || []
  })

  const [voted, setVoted] = useState(undefined)
  const [authenticate, setAuthenticate] = useState(false)
  const [share, setShare] = useState(false)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  function fetchPoll(id) {
    axios.get(`/polls${ id ? `/${id}` : '' }`).then( response => {
      setPoll({
        id: response.data.id,
        name: response.data.name,
        options: response.data.poll_options || [],
        results: response.data.poll_options_with_results || []
      })
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  function handleVote(option) {
    if (user) {
      axios.post(`/polls/${poll.id}/vote`, { poll_option_id: option.id }).then(response => {
        setShare(true)
        setVoted(option)
        dispatch({ type: 'UPDATE', payload: { user: response.data } })
        fetchPoll(poll.id)
        animateScroll.scrollTo(document.getElementById(props.data.id).offsetTop, { duration: 500, smooth: true })
        window.gtag('event', 'submitted', { event_category: 'voting', event_label: `${poll.name}/${option.name}` })
      }).catch(error => {
        console.error(error)
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        alert('Ha ocurrido un error al enviar tu voto. Vuelve a intentarlo en unos minutos.')
      })
    } else {
      setAuthenticate(true)
      setVoted(option)
      window.gtag('event', 'started', { event_category: 'voting', event_label: `${poll.name}/${option.name}` })
    }
  }

  function handleClose() {
    setShare(false)
    setAuthenticate(false)
  }

  function handleAuthenticated() {
    setAuthenticate(false)
    if (user.votes.find( vote => vote.voting_id === poll.id )) {
      if (window.confirm('Ya habías votado en esta encuesta, ¿Te gustaria reemplazar tu voto?')) {
        handleVote(voted)
      } else {
        fetchPoll(poll.id)
      }
    } else {
      handleVote(voted)
    }
  }

  return (
    <Section id={ props.data.id }>
      { authenticate ? <Authentication successHandler={ handleAuthenticated } closeHandler={ handleClose } /> : '' }
      { share ? <Share closeHandler={ handleClose } /> : '' }
      <SectionTitle><small>#Opinión</small> { poll.name }</SectionTitle>
      { poll.results.length ? (
        <Results>{ poll.results.map((result) => <OptionResult key={ result.id } data={ result } />) }</Results>
      ) : (
        <Options>{ poll.options.map((option) => <Option key={ option.id } data={ option } voteHandler={ handleVote } />) }</Options>
      ) }
    </Section>
  )
}

Poll.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    poll_options: PropTypes.array,
    poll_options_with_results: PropTypes.array,
  }).isRequired
}

export default Poll

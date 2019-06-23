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
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'

import { animateScroll } from 'react-scroll'

import axios from 'axios'

import Authentication from '../elements/Authentication'
import Share from '../elements/Share'
import Candidate from '../elements/Candidate'
import PartyResult from '../elements/PartyResult'
import VotingSelect from '../elements/VotingSelect'

import Section from '../styled/Section'
import SectionTitle from '../styled/SectionTitle'
import SectionDescription from '../styled/SectionDescription'
import BlurredQuestion from '../styled/BlurredQuestion'

const Candidates = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 .5rem;
`
const Results = styled.div`
  margin: 0 1rem;
  border-radius: .5em;
  background: #fefefe;
  padding: 2em 1em 1.5em 1em;
`
const Placeholder = styled.div`
  margin: 0 1rem;
  height: 12em;
`

function Voting(props) {

  const [voting, setVoting] = useState({
    id: undefined,
    name: props.name,
    candidates: [],
    results: []
  })

  const [voted, setVoted] = useState(undefined)
  const [authenticate, setAuthenticate] = useState(false)
  const [share, setShare] = useState(false)

  const [provinces, setProvinces] = useState([])

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchVoting(props.endpoint)
  }, [])

  function fetchVoting(id) {
    axios.get(`/ballots${ id ? `/${id}` : '' }`).then( response => {
      setVoting({
        id: response.data.id,
        name: response.data.name,
        candidates: response.data.candidates || [],
        results: response.data.candidates_with_results || []
      })
      if (response.data.candidates_with_results && props.endpoint === 'local') {
        fetchProvinces()
      }
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  function fetchProvinces() {
    axios.get('/provinces').then( response => {
      setProvinces(response.data)
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  function handleVote(candidate) {
    if (user) {
      axios.post(`/ballots/${voting.id}/vote`, { candidate_id: candidate.id }).then(response => {
        setShare(true)
        setVoted(candidate)
        dispatch({ type: 'UPDATE', payload: { user: response.data } })
        fetchVoting(voting.id)
        animateScroll.scrollTo(document.getElementById(props.endpoint).offsetTop, { duration: 500, smooth: true })
        window.gtag('event', 'submitted', { event_category: 'voting', event_label: `${voting.name}/${candidate.party.name}/${candidate.name}` })
      }).catch(error => {
        console.error(error)
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        alert('Ha ocurrido un error al enviar tu voto. Vuelve a intentarlo en unos minutos.')
      })
    } else {
      setAuthenticate(true)
      setVoted(candidate)
      window.gtag('event', 'started', { event_category: 'voting', event_label: `${voting.name}/${candidate.party.name}/${candidate.name}` })
    }
  }

  function handleClose() {
    setShare(false)
    setAuthenticate(false)
  }

  function handleAuthenticated() {
    setAuthenticate(false)
    if (user.votes.find( vote => vote.voting_id === voting.id )) {
      if (window.confirm('Ya habías votado en esta elección, ¿Te gustaria reemplazar tu voto?')) {
        handleVote(voted)
      } else {
        fetchVoting(voting.id)
      }
    } else {
      handleVote(voted)
    }
  }

  function handleChange(event) {
    fetchVoting(event.target.value)
  }

  return (
    <Section id={ props.endpoint }>
      { authenticate ? <Authentication successHandler={ handleAuthenticated } closeHandler={ handleClose } /> : '' }
      { share ? <Share closeHandler={ handleClose } /> : '' }
      { (props.endpoint === 'national' || voting.candidates.length) ? (
        <SectionTitle>{ voting.results.length ? `Resultados para ${voting.name}` : `¿A quién votás para ${voting.name}?` }</SectionTitle>
      ) : (
        <SectionTitle>{ `Resultados para ${voting.name}` }<VotingSelect selected={ voting.id } provinces={ provinces } changeHandler={ handleChange } /></SectionTitle>
      )}
      { voting.candidates.length ? <SectionDescription>{ props.endpoint === 'national' ? 'Elegí el espacio político que querés votar. El 12 de junio cierran las listas y vas a poder elegir el candidato.' : 'Si no ves candidatos es porque en tu provincia no se presentaron oficialmente. Mientras los candidatos se deciden, elegí el espacio político que querés votar.' }</SectionDescription> : '' }
      { voting.results.length ? (
        <Results>{ voting.results.map((result) => <PartyResult key={ result.id } data={ result } />) }</Results>
      ) : (
        voting.candidates.length ? (
          <Candidates>{ voting.candidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } voteHandler={ handleVote } />) }</Candidates>
        ) : (
          <Placeholder>
            <BlurredQuestion>
              <p>No hay elecciones activas por el momento.</p>
            </BlurredQuestion>
          </Placeholder>
        )
      ) }
    </Section>
  )
}

Voting.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string
}

export default Voting

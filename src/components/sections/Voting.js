import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'

import { getUser } from '../../redux/selectors'

import Authentication from '../elements/Authentication'
import Share from '../elements/Share'
import Candidate from '../elements/Candidate'
import PartyResult from '../elements/PartyResult'

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

class Voting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      name: this.props.name,
      candidates: [],
      results: [],
      voted: null,
      authenticate: false,
      share: false
    }

    this.fetchVoting = this.fetchVoting.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAuthenticated = this.handleAuthenticated.bind(this)
  }

  componentDidMount() {
    this.fetchVoting(this.props.endpoint)
  }

  fetchVoting(id) {
    const _this = this
    axios.get(`/ballots${ id ? `/${id}` : '' }`).then( response => {
      _this.setState({
        id: response.data.id,
        name: response.data.name,
        candidates: response.data.candidates || [],
        results: response.data.candidates_with_results || []
      })
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  handleVote(candidate) {
    if (this.props.user) {
      axios.post(`/ballots/${this.state.id}/vote`, {
        candidate_id: candidate.id
      }).then(response => {
        this.setState({
          share: true,
          voted: candidate.id
        })
        this.fetchVoting(this.state.id)
        animateScroll.scrollTo(document.getElementById(this.props.endpoint).offsetTop, { duration: 500, smooth: true })
        window.gtag('event', 'submitted', { event_category: 'voting', event_label: `${this.state.name}/${candidate.party.name}/${candidate.name}` })
      }).catch(error => {
        console.error(error)
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        alert('Ha ocurrido un error al enviar tu voto. Vuelve a intentarlo en unos minutos.')
      })
    } else {
      this.setState({
        authenticate: true,
        voted: candidate.id
      })
      window.gtag('event', 'started', { event_category: 'voting', event_label: `${this.state.name}/${candidate.party.name}/${candidate.name}` })
    }
  }

  handleClose() {
    this.setState({
      authenticate: false,
      share: false
    })
  }
  handleAuthenticated() {
    this.setState({
      authenticate: false
    })
    if (this.props.user.votes.find( vote => vote.voting_id === this.state.id )) {
      if (window.confirm('Ya habías votado en esta elección, ¿Te gustaria reemplazar tu voto?')) {
        this.handleVote(this.state.voted)
      } else {
        this.fetchVoting(this.state.id)
      }
    } else {
      this.handleVote(this.state.voted)
    }
  }

  render() {
    return (
      <Section id={ this.props.endpoint }>
        { this.state.authenticate ? <Authentication successHandler={ this.handleAuthenticated } closeHandler={ this.handleClose } /> : '' }
        { this.state.share ? <Share closeHandler={ this.handleClose } /> : '' }
        <SectionTitle>{ this.state.results.length ? `Resultados para ${this.state.name}` : `¿A quién votás para ${this.state.name}?` }</SectionTitle>
        { this.state.candidates.length ? <SectionDescription>{ this.props.endpoint === 'national' ? 'Elegí el espacio político que querés votar. El 12 de junio cierran las listas y vas a poder elegir el candidato.' : 'Si no ves candidatos es porque en tu provincia no se presentaron oficialmente. Mientras los candidatos se deciden, elegí el espacio político que querés votar.' }</SectionDescription> : '' }
        { this.state.results.length ? (
          <Results>{ this.state.results.map((result) => <PartyResult key={ result.id } data={ result } />) }</Results>
        ) : (
          this.state.candidates.length ? (
            <Candidates>{ this.state.candidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } voteHandler={ this.handleVote } />) }</Candidates>
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
}

Voting.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string
}

export default connect(state => ({ user: getUser(state) }))(Voting)

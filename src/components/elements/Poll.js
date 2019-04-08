import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'

import { update } from '../../redux/actions'
import { getUser } from '../../redux/selectors'

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

class Poll extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.data.id,
      name: this.props.data.name,
      options: this.props.data.poll_options || [],
      results: this.props.data.poll_options_with_results || [],
      voted: undefined,
      authenticate: false,
      share: false
    }

    this.fetchPoll = this.fetchPoll.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleAuthenticated = this.handleAuthenticated.bind(this)
  }

  fetchPoll(id) {
    const _this = this
    axios.get(`/polls${ id ? `/${id}` : '' }`).then( response => {
      _this.setState({
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

  handleVote(option) {
    if (this.props.user) {
      const _this = this
      axios.post(`/polls/${_this.state.id}/vote`, { poll_option_id: option.id }).then(response => {
        _this.setState({
          share: true,
          voted: option
        })
        _this.props.update({ user: response.data })
        _this.fetchPoll(_this.state.id)
        animateScroll.scrollTo(document.getElementById(_this.props.data.id).offsetTop, { duration: 500, smooth: true })
        window.gtag('event', 'submitted', { event_category: 'voting', event_label: `${_this.state.name}/${option.name}` })
        window.fbq('trackCustom', 'VoteSubmitted', { poll: _this.state.name, option: option.name })
      }).catch(error => {
        console.error(error)
        window.gtag('event', 'api', { event_category: 'error', event_label: error })
        alert('Ha ocurrido un error al enviar tu voto. Vuelve a intentarlo en unos minutos.')
      })
    } else {
      this.setState({
        authenticate: true,
        voted: option
      })
      window.gtag('event', 'started', { event_category: 'voting', event_label: `${this.state.name}/${option.name}` })
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
      if (window.confirm('Ya habías votado en esta encuesta, ¿Te gustaria reemplazar tu voto?')) {
        this.handleVote(this.state.voted)
      } else {
        this.fetchPoll(this.state.id)
      }
    } else {
      this.handleVote(this.state.voted)
    }
  }

  render() {
    return (
      <Section id={ this.props.data.id }>
        { this.state.authenticate ? <Authentication successHandler={ this.handleAuthenticated } closeHandler={ this.handleClose } /> : '' }
        { this.state.share ? <Share closeHandler={ this.handleClose } /> : '' }
        <SectionTitle><small>#Opinión</small> { this.state.name }</SectionTitle>
        { this.state.results.length ? (
          <Results>{ this.state.results.map((result) => <OptionResult key={ result.id } data={ result } />) }</Results>
        ) : (
          <Options>{ this.state.options.map((option) => <Option key={ option.id } data={ option } voteHandler={ this.handleVote } />) }</Options>
        ) }
      </Section>
    )
  }
}

Poll.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    poll_options: PropTypes.array,
    poll_options_with_results: PropTypes.array,
  }).isRequired
}

export default connect(state => ({ user: getUser(state) }), { update })(Poll)

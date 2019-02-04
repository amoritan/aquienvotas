import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

import { getToken } from '../../redux/selectors'

import Authentication from '../elements/Authentication'
import Candidate from '../elements/Candidate'
import Section from '../styled/Section'

const Title = styled.h2`
  font-size: 2em;
  font-weight: 700;
  color: #fefefe;
  margin: 1rem;
`
const Candidates = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 .5rem;
  article {
    width: calc(50% - 1rem);
    box-sizing: border-box;
    margin: .5rem;
  }
`

class Voting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      name: this.props.name,
      candidates: [],
      voted: null,
      authenticate: false,
      share: false
    }

    this.handleVote = this.handleVote.bind(this)

    this.handleClose = this.handleClose.bind(this)
    this.handleAuthenticated = this.handleAuthenticated.bind(this)
  }

  componentDidMount() {
    const _this = this
    axios.get(`/ballots${ _this.props.endpoint ? `/${_this.props.endpoint}` : '' }`).then( response => {
      _this.setState({
        id: response.data.id,
        name: response.data.name,
        candidates: response.data.candidates
      })
    }).catch( error => {
      console.error(error)
    })
  }

  handleVote(candidateId) {
    if (this.props.token) {
      axios.post(`/ballots/${this.state.id}/vote`, {
        candidate_id: candidateId
      }).then(response => {
        this.setState({
          share: true,
          voted: candidateId
        })
        alert('Voted!')
      }).catch(error => {
        console.error(error)
        alert('Ha ocurrido un error al enviar tu voto. Vuelve a intentarlo en unos minutos.')
      })
    } else {
      this.setState({
        authenticate: true,
        voted: candidateId
      })
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
    this.handleVote(this.state.voted)
  }

  render() {
    return (
      <Section>
        { this.state.authenticate ? <Authentication successHandler={ this.handleAuthenticated } closeHandler={ this.handleClose } /> : '' }
        <Title>{ this.props.name }</Title>
        <Candidates>{ this.state.candidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } voteHandler={ this.handleVote } />) }</Candidates>
      </Section>
    )
  }
}

Voting.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string
}

export default connect(state => ({ token: getToken(state) }))(Voting)

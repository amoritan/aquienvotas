import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'

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
      candidates: []
    }
  }

  componentDidMount() {
    const _this = this
    axios.get(`/ballots/${_this.props.endpoint}`).then( response => {
      _this.setState({
        id: response.data.id,
        name: response.data.name,
        candidates: response.data.candidates
      })
    }).catch( error => {
      console.error(error)
    })
  }

  render() {
    return (
      <Section>
        <Title>{ this.props.name }</Title>
        <Candidates>{ this.state.candidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } />) }</Candidates>
      </Section>
    )
  }
}

Voting.propTypes = {
  name: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
}

export default Voting

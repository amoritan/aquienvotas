import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darken } from 'polished'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVoteYea } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faVoteYea)

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: ${ props => `linear-gradient(${ props.color } 0%, ${ props.color } 55%, #fefefe 55%, #fefefe 100%)` };
  border-radius: .5em;
  max-width: 12em;
  padding: 1em .5em;
  height: 18em;
  width: calc(50% - 1rem);
  box-sizing: border-box;
  margin: .5rem;
  @media (min-width: 48rem) {
    width: calc(25% - 1rem);
  }
  h3, h4 {
    margin: 0 0 .5rem 0;
    height: 2em;
    line-height: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    font-size: 1em;
    font-weight: 600;
    vertical-align: middle;
    color: #fefefe;
  }
  h4 {
    font-size: .8em;
    font-weight: 400;
    color: ${ props => darken(0.25, props.color) };
    text-transform: uppercase;
  }
  img {
    display: block;
    margin: 0 auto;
    width: 80%;
    height: auto;
    border-radius: 100%;
    flex-shrink: 2;
  }
  button {
    margin-top: 1em;
    color: #fefefe;
    background: ${ props => props.color };
    border: .125em solid ${ props => props.color };
    border-radius: 2em;
    font-size: 1em;
    font-weight: 700;
    padding: .5em;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: all .25s;
    &:hover {
      background: none;
      color: ${ props => props.color };
    }
  }
`

class Candidate extends Component {
  constructor(props) {
    super(props)

    this.handleVote = this.handleVote.bind(this)
  }

  handleVote() {
    this.props.voteHandler(this.props.data.id)
  }

  render() {
    return (
      <Container color={ `#${ this.props.data.color || this.props.data.party.color }` }>
        <h3>{ this.props.data.name }</h3>
        <h4>{ this.props.data.party.name }</h4>
        <img src="https://via.placeholder.com/240" alt={ this.props.data.name } width="120" height="120" />
        <button onClick={ this.handleVote }><FontAwesomeIcon icon="vote-yea" /> Votar</button>
      </Container>
    )
  }
}

Candidate.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string,
    result: PropTypes.number,
    party: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      result: PropTypes.number
    }).isRequired
  }).isRequired,
  voteHandler: PropTypes.func.isRequired
}

export default Candidate

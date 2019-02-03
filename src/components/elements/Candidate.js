import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darken } from 'polished'

import VotingButton from './VotingButton';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: ${ props => `linear-gradient(${ props.color } 0%, ${ props.color } 55%, #fefefe 55%, #fefefe 100%)` };
  border-radius: .5em;
  max-width: 12em;
  padding: 1em .5em;
  height: 18em;
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
`

function Candidate(props) {
  return (
    <Container color={ `#${ props.data.color || props.data.party.color }` }>
      <h3>{ props.data.name }</h3>
      <h4>{ props.data.party.name }</h4>
      <img src="https://via.placeholder.com/240" alt={ props.data.name } width="120" height="120" />
      <VotingButton candidate={ props.data.id } color={ `#${ props.data.color || props.data.party.color }` } percentage={ 42.3 } />
    </Container>
  )
}

Candidate.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string,
    party: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
}

export default Candidate

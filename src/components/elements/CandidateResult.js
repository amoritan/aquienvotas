import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'

const Container = styled.div`
  margin: .25em 0;
  display: flex;
  align-items: center;
  img {
    display: block;
    margin: 0;
    width: 2.5em;
    height: 2.5em;
    border: .125em solid ${ props => props.color };
    border-radius: 100%;
    position: relative;
    z-index: 2;
    background: ${ props => props.color };
  }
  div {
    width: 100%;
    h4 {
      font-size: 1em;
      font-weight: 600;
      vertical-align: middle;
      margin 0 0 0 .25em;
      color: #1e1e1e;
    }
    i {
      color: ${ props => props.color };
      &::before {
        background: ${ props => transparentize(.4, props.color) };
      }
    }
  }
`

const grow = keyframes`
  from { width: 0; }
  to { width: ${ props => props.percentage * 2 }%; }
`;

const Progress = styled.i`
  display: flex;
  align-items: center;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  margin 0 0 0 .25em;
  ::before {
    content: '';
    display: block;
    width: ${ props => props.percentage * 2 }%;
    height: .5em;
    border: .125em solid;
    border-radius: .5em;
    padding: 0 1em;
    box-sizing: border-box;
    margin 0 .25em 0 0;
    animation: ${grow} 1s ease;
  }
`

function CandidateResult(props) {
  return (
    <Container color={ `#${ props.data.color || props.partyColor }` } percentage={ props.data.result }>
      <img src={ props.data.avatar || '/images/avatar.png' } alt={ props.data.name } width="120" height="120" />
      <div>
        <h4>{ props.data.name }</h4>
        <Progress percentage={ props.data.result }>{ props.data.result } %</Progress>
      </div>
    </Container>
  )
}

CandidateResult.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    result: PropTypes.number.isRequired,
    avatar:  PropTypes.string,
  }).isRequired,
  partyColor: PropTypes.string.isRequired
}

export default CandidateResult

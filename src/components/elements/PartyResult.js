import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import CandidateResult from '../elements/CandidateResult'

const Container = styled.article`
  margin: .5em 0;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: .25em 0;
    border-bottom: .0625em solid ${ props => props.color };
    h3 {
      font-size: .95em;
      font-weight: 400;
      color: ${ props => props.color };
      text-transform: uppercase;
      margin: 0;
    }
    strong {
      font-size: .95em;
      color: ${ props => props.color };
      font-weight: 600;
    }
  }
  main {
    padding: .5em 0;
  }
`
// border: .0625em solid ${ props => props.color };

function PartyResult(props) {
  return (
    <Container color={ `#${ props.data.color }` }>
      <header>
        <h3>{ props.data.name }</h3>
        <strong>{ props.data.result } %</strong>
      </header>
      <main>
        { props.data.candidates.map((candidate) => <CandidateResult key={ candidate.id } data={ candidate } partyColor={ props.data.color } />) }
      </main>
    </Container>
  )
}

PartyResult.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    result: PropTypes.number.isRequired,
    candidates: PropTypes.array.isRequired
  }).isRequired
}

export default PartyResult

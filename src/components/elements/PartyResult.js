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



import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { transparentize } from 'polished'

import CandidateResult from '../elements/CandidateResult'

const Container = styled.article`
  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 0 .25em 0;
    padding: .25em 0 0 0;
    border-bottom: .0625em solid ${ props => transparentize(.6, props.color) };
    position: relative;
    color: ${ props => transparentize(.2, props.color) };
    h3 {
      font-size: .8em;
      font-weight: 400;
      text-transform: uppercase;
      margin: 0;
      position: absolute;
      top: -.75em;
    }
    strong {
      font-size: .8em;
      font-weight: 600;
      position: absolute;
      bottom: -1.125em;
      white-space: nowrap;
    }
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

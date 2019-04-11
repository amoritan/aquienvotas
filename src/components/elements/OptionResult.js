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
import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'

const Container = styled.li`
  margin: .25em 0;
  display: flex;
  align-items: center;
  h4 {
    font-size: 1em;
    color: #fefefe;
    background: ${ props => props.color };
    border: .125em solid ${ props => props.color };
    border-radius: 2em 0 0 2em;
    font-size: 1em;
    font-weight: 700;
    padding: .5em;
    margin: 0;
    width: 24em;
    overflow: hidden;
    white-space: nowrap;
  }
  i {
    color: ${ props => props.color };
    &::before {
      background: ${ props => transparentize(.65, props.color) };
    }
  }
`

const grow = keyframes`
  from { width: 0; }
  to { width: ${ props => props.percentage }%; }
`;

const Progress = styled.i`
  display: flex;
  align-items: center;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  white-space: nowrap;
  ::before {
    content: '';
    display: block;
    width: ${ props => props.percentage }%;
    height: 2.125em;
    border: .125em solid;
    border-radius: 0 2em 2em 0;
    padding: 0 .25em;
    margin 0 .25em 0 0;
    animation: ${grow} 1s ease;
  }
`

function OptionResult(props) {
  return (
    <Container color={ `#${ props.data.color }` } percentage={ props.data.result }>
    <h4>{ props.data.name }</h4>
      <Progress percentage={ props.data.result }>{ props.data.result } %</Progress>
    </Container>
  )
}

OptionResult.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    result: PropTypes.number,
  }).isRequired
}

export default OptionResult

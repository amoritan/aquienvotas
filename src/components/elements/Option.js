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

const Container = styled.li`
  margin: .5em;
  padding: 0;
  button {
    color: #fefefe;
    background: ${ props => props.color };
    border: .125em solid ${ props => props.color };
    border-radius: 2em;
    font-size: 1em;
    font-weight: 700;
    padding: .5em 1em;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: all .25s;
    &:hover {
      background: ${ props => transparentize(.85, props.color) };
      color: ${ props => props.color };
    }
  }
`

function Option(props) {

  function handleVote() {
    props.voteHandler(props.data)
  }

  return (
    <Container color={ `#${ props.data.color }` }>
      <button onClick={ handleVote }>{ props.data.name }</button>
    </Container>
  )
}

Option.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    result: PropTypes.number,
  }).isRequired,
  voteHandler: PropTypes.func.isRequired
}

export default Option

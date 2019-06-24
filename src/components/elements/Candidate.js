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

import styled, { css } from 'styled-components'
import { darken } from 'polished'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faVoteYea } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faVoteYea)

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: ${ props => `linear-gradient(${ props.color } 0%, ${ props.color } 60%, #fefefe 60%, #fefefe 100%)` };
  border-radius: .5em;
  max-width: 12em;
  padding: 1em .5em;
  height: 20em;
  width: calc(50% - 1rem);
  box-sizing: border-box;
  margin: .5rem;
  @media (min-width: 48rem) {
    width: calc(25% - 1rem);
  }
  h3, h4, h5 {
    margin: 0 0 .5rem 0;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  h3 {
    font-size: 1em;
    font-weight: 600;
    color: #fefefe;
    align-items: flex-end;
    margin-bottom: 0;
  }
  h4 {
    font-size: .8em;
    font-weight: 400;
    color: ${ props => darken(0.25, props.color) };
    text-transform: uppercase;
  }
  h5 {
    font-size: .8em;
    font-weight: 600;
    color: #fefefe;
    box-shadow: 0 -.0625rem 0 0 #fefefe;
    align-items: flex-start;
    padding-top: .15rem;
  }
  div {
    flex-shrink: 2;
    position: relative;
  }
  img {
    display: block;
    margin: 0 auto;
    width: 60%;
    height: auto;
    border-radius: 100%;
    border: .20em solid ${ props => props.color };
    background: ${ props => props.color };
    ${props => props.hasCompanion && css`
      position: relative;
      z-index: 2;
      left: -17.5%;
      &.companion {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 42.5%;
        transform: scale(.8);
      }
    `};
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

function Candidate(props) {

  function handleVote() {
    props.voteHandler(props.data)
  }

  return (
    <Container color={ `#${ props.data.color || props.data.party.color }` } hasCompanion={ Boolean(props.data.companion) }>
      <h3>{ props.data.name }</h3>
      { props.data.companion ? <h5>{ props.data.companion.name }</h5> : '' }
      <h4>{ props.data.party.name }</h4>
      <div>
        <img src={ props.data.avatar || '/images/avatar.png' } alt={ props.data.name } width="240" height="240" />
        { props.data.companion ? <img src={ props.data.companion.avatar || '/images/avatar.png' } alt={ props.data.companion.name } width="240" height="240" class="companion" /> : '' }
      </div>
      <button onClick={ handleVote }><FontAwesomeIcon icon="vote-yea" /> Votar</button>
    </Container>
  )
}

Candidate.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    result: PropTypes.number,
    avatar:  PropTypes.string,
    party: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      color: PropTypes.string.isRequired,
      result: PropTypes.number
    }).isRequired,
    companion: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  }).isRequired,
  voteHandler: PropTypes.func.isRequired
}

export default Candidate

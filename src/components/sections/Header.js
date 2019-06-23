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



import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-scroll'

import Share from '../elements/Share'

import Button from '../styled/Button'

library.add(faShareAlt)

const Container = styled.header`
  color: #fefefe;
  background: #0095d5;
  background-image: linear-gradient(${transparentize(.2, '#0095d5')}, ${transparentize(.2, '#0095d5')}), url('./images/background.svg');
  background-size: 16em;
  padding: 1em .5em;
  transition: all 1s;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em 0;
    transition: all 1s;
    img {
      display: block;
      width: auto;
      height: 2.5em;
      vertical-align: center;
    }
    h1 {
      font-size: 1.75em;
      font-weight: 700;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    strong {
      display: none;
      font-weight: 600;
      font-size: 2em;
      text-align: center;
      line-height: .75em;
      width: 3em;
      small {
        display: block;
        font-size: .5em;
        text-transform: uppercase;
      }
    }
    button {
      display: none;
      appearance: none;
      border: none;
      background: none;
      font-size: 2em;
      color: #fefefe;
      padding: 0;
      margin: 0;
      width: 3em;
      height: 100%;
      cursor: pointer;
    }
  }
  & > p {
    font-size: 1em;
    text-align: center;
    margin: 1em auto;
  }
  & > button {
    display: block;
    margin 1.5em auto .75em auto;
  }
  & > a {
    text-decoration: underline;
    color: #fefefe;
    cursor: pointer;
    display: block;
    width: fit-content;
    margin 0 auto 1.5rem auto;
    font-size: .85em;
  }
  ${props => props.small && css`
    background: #0095d5;
    padding: .5em .5em;
    margin: 0 auto 3em auto;
    & > div {
      font-size: .65em;
      margin: 0;
      h1 {
        cursor: pointer;
      }
      strong, button {
        display: block;
      }
    }
    & > p, & > button, & > a {
      display: none;
    }
  `};
`

function Header(props) {

  const [closed, setClosed] = useState(props.closed)
  const [users, setUsers] = useState(0)
  const [share, setShare] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers() {
    axios.get('/users/amount').then( response => {
      setUsers(response.data.users)
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  function handleClick() {
    setClosed(previousClosed => {
      return !previousClosed
    })
  }

  function handleShare() {
    setShare(true)
  }

  function handleClose() {
    setShare(false)
  }

  return (
    <Container small={ closed }>
      { share ? <Share title="Compartir" closeHandler={ handleClose } /> : '' }
      <div>
        <strong><small>Somos</small><span>{ users > 1000 ? ((users / 1000).toFixed(users % 1000 !== 0) + ' K') : users }</span></strong>
        <h1 onClick={ closed ? handleClick : undefined }>
          <img src="./images/icon.svg" alt="Logotipo de #AQuienVotas" width="980" height="980" />
          <span>#AQuienVotas</span>
        </h1>
        <button title="Compartir" onClick={ handleShare }><FontAwesomeIcon icon="share-alt" /></button>
      </div>
      <p>Ya somos { users } personas construyendo la primera encuesta abierta y representativa de las <strong>Elecciones 2019 en Argentina</strong>, ¡Sumate!</p>
      <Button onClick={ handleClick }>Votá</Button>
      <Link to="about" smooth={ true } duration={ 500 }>Más información</Link>
    </Container>
  )
}

export default Header

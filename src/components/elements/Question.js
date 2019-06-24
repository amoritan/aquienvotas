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



import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

const Container = styled.li`
  margin: 0;
  padding: 0;
  h3 {
    font-size: 1.25em;
    font-weight: 400;
    color: #fefefe;
    margin: 0;
    padding: 1em 1rem;
    cursor: pointer;
  }
  div {
    background: #fefefe;
    color: #1e1e1e;
    overflow: hidden;
    transition: all .5s;
    transform: scaleY(0);
    transform-origin: center top;
    max-height: 0;
    line-height: 1.5em;
    p {
      margin: 1em;
    }
    a {
      color: #0095d5;
    }
    strong {
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin: 1em;
      padding: 0;
      li {
        margin: .5em 0;
        padding: 0;
        display: flex;
        a {
          min-width: 8em;
        }
      }
    }
  }
  ${props => props.open && css`
    div { transform: scaleY(1); max-height: 48em; }
  `};
`

function Question(props) {

  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(previous => {
      return !previous
    })
    window.gtag('event', 'view', { event_category: 'faq', event_label: props.title })
  }

  return (
    <Container open={ open }>
      <h3 onClick={ handleClick }>{ props.title }</h3>
      <div>{ props.children }</div>
    </Container>
  )
}

Question.propTypes = {
  title: PropTypes.string.isRequired
}

export default Question
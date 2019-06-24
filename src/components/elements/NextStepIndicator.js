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
import PropTypes from 'prop-types'

import styled, { css, keyframes } from 'styled-components'
import { animateScroll } from 'react-scroll'

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`
const slideOut = keyframes`
  from { transform: translateY(0%); }
  to { transform: translateY(100%); }
`

const stripes = keyframes`
  to { background-position: -12em 0; }
`

const Container = styled.button`
  position: fixed;
  right: 0; bottom: 0; left: 0;
  z-index: 100;
  background: #00d569;
  color: #fefefe;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5em;
  border: none;
  cursor: pointer;
  background-image: linear-gradient( 135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), linear-gradient(#00d569, #00d569);
  background-size: 8em 4em, 100% 100%, 100% 100%;
  box-shadow: 0 -.25em 1em rgba(0,0,0,.25);
  animation: ${slideIn} 1s ease, ${stripes} 5s linear infinite;
  ${props => props.hidden && css`
    animation: ${slideOut} 1s ease both;
  `};
`

function NextStepIndicator(props) {

  const [hidden, setHidden] = useState(false)

  function handleClick() {
    setHidden(true)
    animateScroll.scrollTo(document.getElementById(this.props.destination).offsetTop - 100, { duration: 500, smooth: true })
  }

  useEffect(() => {
    setHidden(false)
  }, [props.destination])

  return (
    <Container onClick={ handleClick } hidden={ hidden }>
      { props.action }
    </Container>
  )

}

NextStepIndicator.propTypes = {
  action: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired
}

export default NextStepIndicator

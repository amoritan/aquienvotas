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

const Container = styled.input`
  display: block;
  width: 100%;
  max-width: 32em;
  font-size: 1em;
  font-weight: 600;
  padding: 1em;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: #fefefe;
  color: #1e1e1e;
  appearance: none;
  margin: .25em auto;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    transform: translateY(-.125em);
    box-shadow: 0 .125em .25em rgba(0,0,0,.5);
  }
  &:active {
    transform: translateY(0);
    opacity: .95;
  }
  &:disabled {
    opacity: .6;
  }
`

function Submit(props) {
  return (
    <Container type="submit" value={ props.title } disabled={ props.disabled } />
  )
}

Submit.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool
}

Submit.defaultProps = {
  title: 'Enviar',
  disabled: false
}

export default Submit
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
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 32em;
  color: #fefefe;
  margin: .25em auto;
  position: relative;
  &::after {
    content: '❯';
    display: block;
    position: absolute;
    top: .25em; right: 2em;
    line-height: 3em;
    transform: rotate(90deg);
  }
`
const Input = styled.select`
  display: block;
  width: 100%;
  font-size: 1em;
  padding: 1em;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: none;
  color: #fefefe;
  appearance: none;
  margin: 0;
  &:disabled {
    opacity: .6;
  }
  &:focus {
    background: #1e1e1e;
  }
`

function Select(props) {
  return (
    <Container>
      <Input value={ props.selected } onChange={ props.changeHandler } name={ props.name }  required={ props.required } disabled={ props.disabled }>
        <option value={ undefined } disabled={ Boolean(props.selected) }>{ props.placeholder }</option>
        { props.options.map((option) => <option key={ option.value } value={ option.value }>{ option.title }</option>) }
      </Input>
    </Container>
  )
}

export default Select
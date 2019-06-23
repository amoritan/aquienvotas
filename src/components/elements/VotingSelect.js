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

const Container = styled.div`
  color: #fefefe;
  font-size: .5em;
  font-weight: 700;
  margin: 0 .5rem;
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  &::after {
    content: '❯';
    display: flex;
    font-size: .5em;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    transform: rotate(90deg);
  }
`
const Input = styled.select`
  font-size: 1em;
  font-weight: 400;
  color: #1e1e1e;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: none;
  appearance: none;
  margin: 0;
  width: 2em;
  height: 2em;
  padding: 0;
  text-indent: 4em;
  position: relative;
  z-index: 5;
`

function VotingSelect(props) {
  return (
    <Container>
      <Input value={ props.selected } onChange={ props.changeHandler }>
        { props.provinces.map((province) => province.ballot ? <option key={ province.ballot.id } value={ province.ballot.id }>{ province.ballot.name }</option> : '') }
      </Input>
    </Container>
  )
}

VotingSelect.propTypes = {
  selected: PropTypes.string,
  provinces: PropTypes.array.isRequired,
  changeHandler: PropTypes.func.isRequired
}

export default VotingSelect
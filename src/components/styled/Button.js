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



import styled from 'styled-components'

const Button = styled.button`
  color: ${ props => props.primaryColor || '#0095d5' };
  background: ${ props => props.primaryColor || '#fefefe' };
  border: .125em solid ${ props => props.primaryColor || '#fefefe' };
  border-radius: 2em;
  font-size: 1em;
  font-weight: 700;
  padding: .5em 2em;
  min-width: 8em;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background: none;
    color: ${ props => props.primaryColor || '#fefefe' };
  }
`

export default Button

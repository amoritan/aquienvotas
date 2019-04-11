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
import { transparentize } from 'polished'

const BlurredQuestion = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1em;
  color: #fefefe;
  h3 {
    margin: 3rem 1rem;
    font-size: 2em;
    text-align: center;
    z-index: 2;
  }
  form {
    width: calc(100% - 2em);
  }
  p {
    text-align: center;
    font-size: 1.5em;
    a {
      text-decoration: none;
      color: #0095d5;
      cursor: pointer;
    }
  }
  p, form {
    background: ${ transparentize(.6, '#1e1e1e') };
    box-shadow: 0 0 2em 4em ${ transparentize(.6, '#1e1e1e') };
    border-radius: 4em;
  }
`

export default BlurredQuestion

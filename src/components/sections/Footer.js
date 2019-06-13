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
import styled from 'styled-components'
import { darken } from 'polished'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faTwitter, faFacebook, faInstagram, faGithub)

const Container = styled.footer`
  text-align: center;
  font-size: 1.25em;
  margin: 2rem 0 1rem 0;
  a {
    display: inline-block;
    text-decoration: none;
    color: #fefefe;
    margin: .5em;
  }
  aside {
    font-size: .6em;
    text-align: left;
    color: ${ darken(.4, '#fefefe') };
    margin: 1rem;
    p {
      margin: 0;
    }
    a {
      color: ${ darken(.4, '#fefefe') };
      margin: 0;
      text-decoration: underline;
    }
  }
`

function Footer() {
  return (
    <Container>
      <a href="mailto:hola@aquienvotas.com">hola@aquienvotas.com</a><br />
      <a href="https://twitter.com/aquienvotas" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
      <a href="https://www.instagram.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Instagram"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
      <a href="https://www.facebook.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Facebook"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
      <a href="https://github.com/andresmoritan/aquienvotas" target="_blank" rel="noopener noreferrer" title="Repositorio de #AQuienVotas en GitHub"><FontAwesomeIcon icon={['fab', 'github']} /></a>
      <aside>
        <p>AQuienVotas. Copyright (C) 2015-2019 Andres Moritan.</p>
        <p>This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.</p>
        <p>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.</p>
        <p>You should have received a copy of the GNU Affero General Public License along with this program. If not, see <a href="https://www.gnu.org/licenses/" target="_blank" rel="noopener noreferrer">https://www.gnu.org/licenses/</a>.</p>
      </aside>
    </Container>
  )
}

export default Footer

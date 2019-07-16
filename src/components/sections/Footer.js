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
      margin: .5em 0;
    }
    a {
      color: ${ darken(.4, '#fefefe') };
      margin: 0;
      text-decoration: underline;
    }
    img {
      height: 2.4em;
      margin-right: .5em;
    }
  }
`

function Footer() {
  return (
    <Container>
      <a href="mailto:hola@aquienvotas.org">hola@aquienvotas.org</a><br />
      <a href="https://twitter.com/aquienvotas" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
      <a href="https://www.instagram.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Instagram"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
      <a href="https://www.facebook.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Facebook"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
      <a href="https://github.com/andresmoritan/aquienvotas" target="_blank" rel="noopener noreferrer" title="Repositorio de #AQuienVotas en GitHub"><FontAwesomeIcon icon={['fab', 'github']} /></a>
      
      <aside>
        <p>Los <span href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">resultados de las encuestas</span> de <a href="https://www.aquienvotas.org" property="cc:attributionName" rel="cc:attributionURL">AQuienVotas</a> se distribuyen bajo la <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="license noopener noreferrer">Licencia Creative Commons Atribución 4.0 Internacional</a>.</p>

        <p>Esta aplicación web es parte de <a href="https://github.com/andresmoritan/aquienvotas" target="_blank" rel="noopener noreferrer">AQuienVotas</a>, un programa de software libre: puedes redistribuirlo y/o modificarlo bajo los términos de la <a href="https://www.gnu.org/licenses/agpl-3.0.html" target="_blank" rel="license noopener noreferrer">Licencia GNU Affero General Public</a> tal y como ha sido publicado por la Free Software Foundation, ya sea la versión 3 de la Licencia, o cualquier versión posterior. Este programa se distribuye con la esperanza de que sea útil, pero SIN NINGUNA GARANTÍA; ni siquiera la garantía implícita de COMERCIALIZACIÓN o ADECUACIÓN A UN PROPÓSITO PARTICULAR.</p>

        <p>
          <img src="./images/cc-logo.svg" alt="Creative Commons Atribución 4.0 Internacional License" />
          <img src="./images/aglp-logo.svg" alt="GNU Affero General Public License" />
        </p>
      </aside>
    </Container>
  )
}

export default Footer

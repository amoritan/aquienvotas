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

function Footer() {
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
      img {
        background: #fff;
        margin-right: 1em;
      }
    }
  `
  
  return (
    <Container>
      <a href="mailto:hola@aquienvotas.com">hola@aquienvotas.com</a><br />
      <a href="https://twitter.com/aquienvotas" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
      <a href="https://www.instagram.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Instagram"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
      <a href="https://www.facebook.com/aquienvotasok" target="_blank" rel="noopener noreferrer" title="#AQuienVotas en Facebook"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
      <a href="https://github.com/andresmoritan/aquienvotas" target="_blank" rel="noopener noreferrer" title="Repositorio de #AQuienVotas en GitHub"><FontAwesomeIcon icon={['fab', 'github']} /></a>
      <aside>
        
        <p><a xmlnsCc="http://creativecommons.org/ns#" href="https://www.aquienvotas.com" property="cc:attributionName" rel="cc:attributionURL">AQuienVotas</a> <span xmlnsDct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">Results</span> are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.</p>
        <br />

        <p>AQuienVotas Program Copyright (C) 2015-2019 Andres Moritan. This program is free software: you can redistribute it and/or modify it under the terms of the <a href="https://www.gnu.org/licenses/agpl-3.0.html" rel="license" >GNU Affero General Public License</a> as published by the Free Software Foundation, either version 3 of the License, or any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.</p>
        <br />

        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
          <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
        </a>
        <a rel="license" href="https://www.gnu.org/licenses/agpl-3.0.html">
          <img alt="GNU Affero General Public License" src="https://www.gnu.org/graphics/agplv3-88x31.png" />
        </a>
      </aside>
    </Container>
  )
}

export default Footer

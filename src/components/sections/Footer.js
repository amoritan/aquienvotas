import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SectionTitle from '../styled/SectionTitle'

library.add(faTwitter, faFacebook, faInstagram)

const Container = styled.footer`
  text-align: center;
  font-size: 1.25em;
  margin: 2rem 0;
  a {
    display: inline-block;
    text-decoration: none;
    color: #fefefe;
    margin: .5em;
  }
`

function Footer() {
  return (
    <Container>
      <a href="mailto:hola@aquienvotas.com">hola@aquienvotas.com</a><br />
      <a href="https://twitter.com/aquienvotas" target="_blank" title="#AQuienVotas en Twitter"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
      <a href="https://www.instagram.com/aquienvotasok/" target="_blank" title="#AQuienVotas en Instagram"><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
      <a href="https://www.facebook.com/aquienvotascom" target="_blank" title="#AQuienVotas en Facebook"><FontAwesomeIcon icon={['fab', 'facebook']} /></a>
    </Container>
  )
}

export default Footer

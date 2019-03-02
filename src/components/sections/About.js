import React from 'react'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShieldCheck, faBalanceScale, faSearch } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SectionTitle from '../styled/SectionTitle'

library.add(faShieldCheck, faBalanceScale, faSearch)

const Background = styled.section`
  background: #0095d5;
`
const Container = styled.div`
  margin: 5rem auto;
  position: relative;
  max-width: 48em;
  color: #fefefe;
  padding: 1em 0 .0625em 0;
  div {
    @media (min-width: 48rem) {
      display: flex;
    }
  }
  article {
    margin: 3em;
    svg {
      display: block;
      font-size: 3em;
      height: auto;
      margin: 0 auto;
    }
    h3, p {
      text-align: center;
      margin: 0;
    }
    h3 {
      margin: 1em auto .5em auto;
    }
  }
`

function About() {
  return (
    <Background id="about">
      <Container>
        <SectionTitle>Nuestros valores</SectionTitle>
        <div>
          <article>
            <FontAwesomeIcon icon="shield-check" />
            <h3>Confiabilidad</h3>
            <p>Encuesta segura y masiva, resultados ponderados estadísticamente.</p>
          </article>
          <article>
            <FontAwesomeIcon icon="balance-scale" />
            <h3>Neutralidad</h3>
            <p>No defiende intereses de ningún partido u organización política.</p>
          </article>
          <article>
            <FontAwesomeIcon icon="search" />
            <h3>Transparencia</h3>
            <p>Resultados en tiempo real, herramientas simples y análisis abiertos.</p>
          </article>
        </div>
      </Container>
    </Background>
  )
}

export default About

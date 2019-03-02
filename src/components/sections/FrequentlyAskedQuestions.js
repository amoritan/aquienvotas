import React from 'react'
import styled from 'styled-components'

import Question from '../elements/Question'

import Section from '../styled/Section'

const Questions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    h3 { box-shadow: 0 .0625em 0 #fefefe; }
    &:last-child {
      h3 { box-shadow: none; }
    }
  }
`

function FrequentlyAskedQuestions() {
  return (
    <Section id="faq">
      <Questions>
        <Question title="¿Quiénes somos?">
          <p>Somos cuatro argentinos con interés en política, estadística y tecnología. Nuestro objetivo es construir una herramienta neutral y representativa para producir un dataset público de calidad con valores anónimos de opinión, orientación política y segmentación.</p>
          <ul>
            <li><a href="https://twitter.com/andresmoritan" target="_blank" rel="noopener noreferrer">@andresmoritan</a> <span>Developer. Creó y mantiene la aplicación. Diseña e implementa las interfaces.</span></li>
            <li><a href="https://twitter.com/ineslovisolo" target="_blank" rel="noopener noreferrer">@ineslovisolo</a> <span>Politóloga especialista en opinión pública. Maneja los análisis políticos y asegura la validez estadística los resultados.</span></li>
            <li><a href="https://twitter.com/AndresKloster" target="_blank" rel="noopener noreferrer">@AndresKloster</a> <span>Product Marketing. Se encarga de redes, comunicación y análisis de nuestros resultados.</span></li>
            <li><a href="https://twitter.com/lapaulaalcala" target="_blank" rel="noopener noreferrer">@lapaulaalcala</a> <span>Educadora, Project Manager. Define el contenido y la experiencia de la aplicación.</span></li>
          </ul>
        </Question>
        <Question title="¿Por qué es necesario el celular?">
          <p>Para asegurar la validez y unicidad de cada voto.</p>
          <p>Usamos la herramienta <a href="https://www.accountkit.com" target="_blank" rel="noopener noreferrer">AccountKit</a>, que envía un código único y privado al teléfono móvil de los usuarios para validar su acceso a la aplicación.</p>
          <p>Nuestro servidor no recibe ni guarda los datos, solo reconoce que el código pertenece a un usuario determinado. De esta manera logramos mantener el anonimato de las personas mientras nos aseguramos que la estadística se construye en base a datos reales.</p>
        </Question>
        <Question title="¿Cómo se muestran los resultados?">
          <p>Los resultados de <strong>#AQuienVotas</strong> se muestran ponderados en tiempo real.</p>
          <p>Es decir, toman en cuenta las variables de información geográfica y demográfica de los usuarios <em>(muestra obtenida)</em> y se comparan con la segmentación real de electores <em>(muestra esperada)</em> para asignar los resultados de cada elección. De esta manera buscamos construir una encuesta federal y representativa.</p>
        </Question>
        <Question title="¿Cómo se eligen los candidatos/as?">
          <p>Las votaciones de <strong>#AQuienVotas</strong> se abren y cierran según los calendarios electorales oficiales de la nación y las provincias.</p>
          <p>A medida que se abren nuevas votaciones, los votos se renuevan. Es decir que una misma persona puede votar varias veces tanto a nivel nacional como provincial. En un primer lugar entre espacios políticos <em>(antes de la publicación de candidatos oficiales)</em>, luego entre candidatos/as de elecciones primarias, por último entre candidatos/as de elecciones generales y en caso de ser necesario, entre candidatos/as de segunda vuelta.</p>
          <p>Podés consultar el calendario electoral de <strong>#AQuienVotas</strong> en <a href="https://drive.google.com/file/d/1pojRENlP1oFUw68jAM5yWZbdD0KidyPj/view?usp=sharing" target="_blank" rel="noopener noreferrer">este documento</a>.</p>
        </Question>
      </Questions>
    </Section>
  )
}

export default FrequentlyAskedQuestions

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

import Question from '../elements/Question'

import Section from '../styled/Section'

function FrequentlyAskedQuestions() {
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
  
  return (
    <Section id="faq">
      <Questions>
        <Question title="¿De qué se trata el proyecto?">
          <p><strong>AQuienVotas</strong> es una plataforma web para generar estadísticas de intención de voto y opinión a través de encuestas transparentes y representativas.</p>
          <p>El proyecto tiene como objetivo representar la opinión de la población de cara a las elecciones ejecutivas del año 2019 en Argentina a través distintas encuestas sobre la intención de voto y la opinión de los visitantes frente temas de debate público en el país.</p>
          <p>Los resultados obtenidos son ponderados y expuestos en tiempo real. Apuntamos a colaborar, con datos de calidad, en el debate público mediante el desarrollo de una herramienta neutral, transparente y accesible.</p>
        </Question>
        <Question title="¿Quiénes somos?">
          <p>Somos cuatro argentinos con interés en política, estadística y tecnología. Nuestro objetivo es construir una herramienta neutral y representativa para producir un set de datos público de calidad con valores anónimos de opinión, orientación política y segmentación.</p>
          <ul>
            <li><a href="https://twitter.com/andresmoritan" target="_blank" rel="noopener noreferrer">@andresmoritan</a> <span><em>Desarrollo</em>: Es programador, creó y mantiene la plataforma; Diseña e implementa la arquitectura y las interfaces.</span></li>
            <li><a href="https://twitter.com/ineslovisolo" target="_blank" rel="noopener noreferrer">@ineslovisolo</a> <span><em>Análisis</em>: Es politóloga especialista en opinión pública, maneja los análisis políticos y asegura la validez estadística los resultados.</span></li>
            <li><a href="https://twitter.com/AndresKloster" target="_blank" rel="noopener noreferrer">@andreskloster</a> <span><em>Difusión</em>: Es especialista en posicionamiento web, se encarga de comunicar y difundir el proyecto.</span></li>
            <li><a href="https://twitter.com/lapaulaalcala" target="_blank" rel="noopener noreferrer">@lapaulaalcala</a> <span><em>Estrategia</em>: Es licenciada en ciencias de la educación, define la experiencia de la aplicación, el contenido y la estrategia del proyecto.</span></li>
          </ul>
        </Question>
        <Question title="¿Por qué es necesario el celular?">
          <p>Para asegurar la validez y unicidad de cada voto.</p>
          <p>Usamos la herramienta <a href="https://www.accountkit.com" target="_blank" rel="noopener noreferrer">AccountKit</a>, que envía un código único y privado al teléfono móvil de los usuarios para validar su acceso a la aplicación.</p>
          <p>Nuestro servidor no recibe ni guarda los datos, solo reconoce que el código pertenece a un usuario determinado. De esta manera logramos mantener el anonimato de las personas mientras nos aseguramos que la estadística se construye en base a datos reales.</p>
        </Question>
        <Question title="¿Es seguro votar?">
          <p>La forma que encontramos de asegurar la transparencia y la seguridad de la aplicación en temas sensibles como el anonimato y la unicidad de cada voto es haciendo público el funcionamiento de la aplicación.</p>
          <p>Por esta razón hemos optado por desarrollar el proyecto como <strong>software libre</strong> bajo la licencia <em>GNU Affero General Public License (AGPL)</em>, no sólo con el objetivo de asegurar la transparencia, sino también de fomentar la colaboración de otros/as individuos/as dentro del proyecto.</p>
          <p>Aquellos/as que tengan interés en formar parte del proyecto, son bienvenidos/as a brindar su aporte al desarrollo de esta herramienta en <a href="https://github.com/andresmoritan/aquienvotas" target="_blank" rel="noopener noreferrer">el repositorio de #AQuienVotas en GitHub</a>.</p>
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

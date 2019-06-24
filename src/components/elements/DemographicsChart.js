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



import React, { useState } from 'react'
import PropTypes from 'prop-types'

import styled, { css, keyframes } from 'styled-components'
import { darken, transparentize } from 'polished'

const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1em;
  background-image: linear-gradient(90deg, ${ darken(.8, '#fefefe') } 0%, ${ darken(.8, '#fefefe') } 1%, rgba(0,0,0,0) 1%, rgba(0,0,0,0) 100%);
  background-size: 2em;
  background-position: center;
  aside {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin: .5em 0 0 0;
  }
`

const RowContainer = styled.div`
  width: ${ props => (props.percentage * 80 / props.max) + 20 }%;
  text-align: center;
  position: relative;
  margin: .25em;
  cursor: default;
  h3 {
    font-size: 1em;
    font-weight: 400;
    text-transform: uppercase;
    color: ${ darken(.2, '#fefefe') };
    margin: 0 0 .125em 0;
    white-space: nowrap;
  }
`
const Percentage = styled.strong`
  display: block;
  width: 100%;
  font-weight: 600;
  font-size: 1.5em;
  line-height: 1.25em;
  color: ${ transparentize(.4, '#fefefe') };
  position: absolute;
  z-index: 5;
  transition: all .5s;
  white-space: nowrap;
  opacity: 0;
  ${props => props.active && css`
    opacity: 1;
  `};
`
const Row = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: strech;
`

const grow = keyframes`
  from { width: 0; }
  to { width: ${ props => props.percentage * 2 }%; }
`
const Block = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2em;
  color: ${ transparentize(.6, '#1e1e1e') };
  strong {
    width: calc(100% - 1em);
    right: .5em; left: .5em;
  }
  ${props => props.female && css`
    justify-content: flex-end;
    strong {
      text-align: left;
    }
    &::after {
      content: '';
      display: block;
      background: #00d569;
      width: ${ props => props.percentage * 2 }%;
      height: 100%;
      border-radius: .25em 0 0 .25em;
      animation: ${grow} 1s ease;
    }
  `};
  ${props => props.other && css`
    width: ${ props => props.percentage * 2 }%;
    background: #d500b8;
    animation: ${grow} 1s ease;
  `};
  ${props => props.male && css`
    justify-content: flex-start;
    strong {
      text-align: right;
    }
    &::before {
      content: '';
      display: block;
      background: #d56c00;
      width: ${ props => props.percentage * 2 }%;
      height: 100%;
      border-radius: 0 .25em .25em 0;
      animation: ${grow} 1s ease;
    }
  `};
`

const GenderButton = styled.button`
  width: fit-content;
  background: none;
  border: none;
  font-size: 1em;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  cursor: pointer;
  opacity: .5;
  transition: all .5s;
  &#female {
    color: #00d569;
  }
  &#other {
    color: #d500b8;
  }
  &#male {
    color: #d56c00;
  }
  ${props => props.active && css`
    opacity: 1;
  `};
`

function DemographicsChart(props) {

  const [gender, setGender] = useState('')

  const biggestGroup = props.demographics.length ? props.demographics.reduce((max, group) => group.total > max.total ? group : max ) : undefined

  function pickGender(event) {
    const pickedGender = event.currentTarget.id
    setGender(previousGender => {
      return previousGender === pickedGender ? '' : pickedGender
    })
  }

  return (
    <Container>
      { props.demographics.map((group, index) => (
        <RowContainer key={ group.code } percentage={ group.total } max={ biggestGroup.total }>
          <h3>{ group.code.replace('from', 'De ').replace('to', ' a ').replace('plus', 'Mayor de ') }</h3>
          <Percentage active={ gender === '' }>{ group.total } %</Percentage>
          <Row>
            <Block percentage={ group.genders[0].group } female><Percentage active={ gender === 'female' }>{ group.genders[0].total } %</Percentage></Block>
            <Block percentage={ group.genders[2].group } other><Percentage active={ gender === 'other' }>{ group.genders[2].total } %</Percentage></Block>
            <Block percentage={ group.genders[1].group } male><Percentage active={ gender === 'male' }>{ group.genders[1].total } %</Percentage></Block>
          </Row>
        </RowContainer>
      ) ) }
      <aside>
        <GenderButton id="female" onClick={ pickGender } active={ gender === 'female' || gender === '' }>Femenino</GenderButton>
        <GenderButton id="other" onClick={ pickGender } active={ gender === 'other' || gender === '' }>Otro</GenderButton>
        <GenderButton id="male" onClick={ pickGender } active={ gender === 'male' || gender === '' }>Masculino</GenderButton>
      </aside>
    </Container>
  )
}

DemographicsChart.propTypes = {
  demographics: PropTypes.array.isRequired
}

export default DemographicsChart

import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { darken, transparentize } from 'polished'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVenus, faGenderless, faMars } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faVenus, faGenderless, faMars)

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
    font-size: 1.5em;
    margin: 1rem 0 0 0;
  }
`

const RowContainer = styled.div`
  width: ${ props => props.percentage * 100 / props.max }%;
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
  }
  strong {
    display: block;
    width: 100%;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 2rem;
    color: ${ transparentize(.4, '#fefefe') };
    position: absolute;
    z-index: 5;
    transition: all .5s;
    white-space: nowrap;
  }
  &:hover, &:active {
    strong {
      opacity: 0;
    }
  }
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
`;
const Block = styled.li`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2em;
  color: ${ transparentize(.6, '#1e1e1e') };
  strong {
    width: fit-content;
    opacity: 0;
  }
  &:hover, &:active {
    strong {
      opacity: 1;
    }
  }
  ${props => props.female && css`
    justify-content: flex-end;
    &::after {
      content: '';
      display: block;
      background: #00d569;
      width: ${ props => props.percentage * 2 }%;
      height: 100%;
      border-radius: .25em 0 0 .25em;
      animation: ${grow} 1s ease;
    }
    strong {
      text-align: right;
      padding-right: .125em;
    }
  `};
  ${props => props.other && css`
    width: ${ props => props.percentage * 2 }%;
    background: #d500b8;
    position: relative;
    animation: ${grow} 1s ease;
    strong {
      width: 100%;
    }
  `};
  ${props => props.male && css`
    justify-content: flex-start;
    &::before {
      content: '';
      display: block;
      background: #d56c00;
      width: ${ props => props.percentage * 2 }%;
      height: 100%;
      border-radius: 0 .25em .25em 0;
      animation: ${grow} 1s ease;
    }
    strong {
      text-align: left;
      padding-left: .125em;
    }
  `};
`

function DemographicsChart(props) {
  const biggestGroup = props.demographics.length ? props.demographics.reduce((max, group) => group.total > max.total ? group : max ) : undefined

  return (
    <Container>
      { props.demographics.map((group, index) => (
        <RowContainer key={ group.code } percentage={ group.total } max={ biggestGroup.total }>
          <h3>{ group.code.replace('from', 'De ').replace('to', ' a ').replace('plus', 'Mayor de ') }</h3>
          <strong>{ group.total } %</strong>
          <Row>
            <Block percentage={ group.genders[0].group } female><strong>{ group.genders[0].total } %</strong></Block>
            <Block percentage={ group.genders[2].group } other><strong>{ group.genders[2].total } %</strong></Block>
            <Block percentage={ group.genders[1].group } male><strong>{ group.genders[1].total } %</strong></Block>
          </Row>
        </RowContainer>
      ) ) }
      <aside>
        <FontAwesomeIcon icon="venus" style={ { color: '#00d569' } } />
        <FontAwesomeIcon icon="genderless" style={ { color: '#d500b8' } } />
        <FontAwesomeIcon icon="mars" style={ { color: '#d56c00' } } />
      </aside>
    </Container>
  )
}

DemographicsChart.propTypes = {
  demographics: PropTypes.array.isRequired
}

export default DemographicsChart

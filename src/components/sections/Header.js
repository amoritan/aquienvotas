import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { Link } from 'react-scroll'

import Button from '../styled/Button'

const Container = styled.header`
  color: #fefefe;
  background: #0095d5;
  background-image: linear-gradient(${transparentize(.2, '#0095d5')}, ${transparentize(.2, '#0095d5')}), url('./images/background.svg');
  background-size: 16em;
  padding: 1em;
  transition: all 1s;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em;
    transition: all 1s;
    img {
      display: block;
      width: auto;
      height: 5em;
      vertical-align: center;
    }
    h1 {
      font-size: 2em;
      font-weight: 700;
      margin: 0;
    }
  }
  p {
    font-size: 1em;
    text-align: center;
    margin: 1em auto;
  }
  button {
    display: block;
    margin 1.5em auto .75em auto;
  }
  a {
    text-decoration: underline;
    color: #fefefe;
    cursor: pointer;
    display: block;
    width: fit-content;
    margin 0 auto 1.5rem auto;
    font-size: .85em;
  }
  ${props => props.small && css`
    background: #0095d5;
    padding: .5em 2em;
    margin: 0 auto 3em auto;
    cursor: pointer;
    div {
      width: fit-content;
      font-size: .75em;
      margin: 0 auto;
    }
    p, button, a {
      display: none;
    }
  `};
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      closed: this.props.closed
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.setState((state) => { return {closed: !state.closed} })
  }

  render() {
    return (
      <Container small={ this.state.closed } onClick={ this.state.closed ? this.handleClick : undefined }>
        <div>
          <img src="./images/icon.svg" alt="Logotipo de #AQuienVotas" width="980" height="980" />
          <h1>#AQuienVotas</h1>
        </div>
        <p>Sumate a la primera encuesta abierta, masiva y representativa de las <strong>Elecciones en Argentina 2019</strong></p>
        <Button onClick={ this.handleClick }>Votá</Button>
        <Link to="about" smooth={ true } duration={ 500 }>Más información</Link>
      </Container>
    )
  }
}

export default Header

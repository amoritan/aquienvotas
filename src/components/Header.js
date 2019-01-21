import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import Button from './styled/Button'

const Container = styled.header`
  color: #fefefe;
  background: #0095d5;
  background-image: linear-gradient(rgba(0, 149, 213, .8), rgba(0, 149, 213, .8)), url('./images/background.svg');
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
    margin 1.5em auto;
  }
  hr {
    border: none;
    height: 2em;
    background: url('./images/carets.svg') no-repeat center;
    background-size: contain;
  }
  ${props => props.small && css`
    background-image: none;
    max-width: 10em;
    padding: .5em 2em;
    margin: 0 auto;
    border-radius: 0 0 1em 1em;
    cursor: pointer;
    div {
      font-size: .5em;
      margin: 0;
    }
    p, button {
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
      <Container small={ this.state.closed } onClick={ this.state.closed ? this.handleClick : false }>
        <div>
          <img src="./images/icon.svg" alt="Logotipo de #AQuienVotas" width="980" height="980" />
          <h1>#AQuienVotas</h1>
        </div>
        <p>¡Estamos creando una estadística transparente para las <strong>Elecciones 2019</strong> en Argentina!</p>
        <Button onClick={ this.handleClick }>¿Te sumás?</Button>
      </Container>
    )
  }
}

export default Header

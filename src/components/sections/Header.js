import React, { Component } from 'react'
import axios from 'axios'

import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShareAlt } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link } from 'react-scroll'

import Share from '../elements/Share'

import Button from '../styled/Button'

library.add(faShareAlt)

const Container = styled.header`
  color: #fefefe;
  background: #0095d5;
  background-image: linear-gradient(${transparentize(.2, '#0095d5')}, ${transparentize(.2, '#0095d5')}), url('./images/background.svg');
  background-size: 16em;
  padding: 1em .5em;
  transition: all 1s;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em 0;
    transition: all 1s;
    img {
      display: block;
      width: auto;
      height: 2.5em;
      vertical-align: center;
    }
    h1 {
      font-size: 1.75em;
      font-weight: 700;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    strong {
      display: none;
      font-weight: 600;
      font-size: 2em;
      text-align: center;
      line-height: .75em;
      width: 3em;
      small {
        display: block;
        font-size: .5em;
        text-transform: uppercase;
      }
    }
    button {
      display: none;
      appearance: none;
      border: none;
      background: none;
      font-size: 2em;
      color: #fefefe;
      padding: 0;
      margin: 0;
      width: 3em;
      height: 100%;
      cursor: pointer;
    }
  }
  & > p {
    font-size: 1em;
    text-align: center;
    margin: 1em auto;
  }
  & > button {
    display: block;
    margin 1.5em auto .75em auto;
  }
  & > a {
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
    padding: .5em .5em;
    margin: 0 auto 3em auto;
    & > div {
      font-size: .65em;
      margin: 0;
      h1 {
        cursor: pointer;
      }
      strong, button {
        display: block;
      }
    }
    & > p, & > button, & > a {
      display: none;
    }
  `};
`

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      closed: this.props.closed,
      users: 0,
      share: false
    }

    this.fetchUsers = this.fetchUsers.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleShare = this.handleShare.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers() {
    const _this = this
    axios.get('/users/amount').then( response => {
      _this.setState({
        users: response.data.users
      })
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  handleClick() {
    this.setState((state) => { return {closed: !state.closed} })
  }

  handleShare() {
    this.setState({ share: true })
  }

  handleClose() {
    this.setState({ share: false })
  }

  render() {
    return (
      <Container small={ this.state.closed }>
        { this.state.share ? <Share title="Compartir" closeHandler={ this.handleClose } /> : '' }
        <div>
          <strong><small>¡Somos!</small><span>{ this.state.users > 1000 ? ((this.state.users / 1000).toFixed(this.state.users % 1000 != 0) + ' K') : this.state.users }</span></strong>
          <h1 onClick={ this.state.closed ? this.handleClick : undefined }>
            <img src="./images/icon.svg" alt="Logotipo de #AQuienVotas" width="980" height="980" />
            <span>#AQuienVotas</span>
          </h1>
          <button title="Compartir" onClick={ this.handleShare }><FontAwesomeIcon icon="share-alt" /></button>
        </div>
        <p>Sumate con { this.state.users } personas a la primera encuesta abierta, masiva y representativa de las <strong>Elecciones en Argentina 2019</strong></p>
        <Button onClick={ this.handleClick }>Votá</Button>
        <Link to="about" smooth={ true } duration={ 500 }>Más información</Link>
      </Container>
    )
  }
}

export default Header

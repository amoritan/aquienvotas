import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faUserSecret, faLock } from '@fortawesome/pro-solid-svg-icons'
import { faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'

import Modal from './Modal'

library.add(faHeart, faUserSecret, faLock)
library.add(faTwitter, faFacebook, faWhatsapp)

const Container = styled.div`
  max-height: calc(100vh - 6em);
  overflow: scroll;
  & > svg {
    display: block;
    font-size: 3em;
    height: auto;
    margin: 0 auto;
  }
  h3 {
    color: #0095d5;
    font-size: 1.5em;
    text-align: center;
    margin: .5em 0 1em 0;
  }
  ul {
    list-style: none;
    margin: 2em 0 0 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: .5em 0;
      color: #0095d5;
      span {
        width: 90%;
        font-size: .8em;
        color: #1e1e1e;
      }
    }
  }
  button {
    width: 100%;
    display: block;
    padding: .5em 1em;
    color: #fefefe;
    text-decoration: none;
    text-align: center;
    border: none;
    border-radius: .25em;
    margin: .25em 0;
    background: ${ lighten(.6, '#1e1e1e') }
    cursor: pointer;
    svg {
      color: #fefefe;
      margin-right: .5em;
      font-size: 1.25em;
    }
    a {
      width: 0;
      height: 0;
      margin: 0;
    }
    &#twitter {
      background: #00aced;
    }
    &#facebook {
      background: #3b5998;
    }
    &#whatsapp {
      background: #25d366;
    }
  }
  svg {
    color: #0095d5;
  }
  strong {
    font-weight: 600;
  }
`

class Share extends Component {
  constructor(props) {
    super(props)
    
    this.handleShare = this.handleShare.bind(this)
  }

  handleShare(event) {
    const link = document.createElement('a')

    switch (event.target.id) {
      case 'twitter':
        link.setAttribute('href', 'https://twitter.com/intent/tweet?text=%C2%A1Estoy%20formando%20parte%20de%20la%20estad%C3%ADstica%20transparente%20para%20las%20%23Elecciones2019%20m%C3%A1s%20grande%20de%20la%20Argentina!&url=https://www.aquienvotas.com&hashtags=AQuienVotas&related=aquienvotas')
        event.target.appendChild(link)
        link.click()
        event.target.removeChild(link)
        break
      case 'facebook':
        window.FB.ui({
          method: 'share',
          href: 'https://www.aquienvotas.com'
        }, function(response){})
        break
      case 'whatsapp':
        link.setAttribute('href', 'whatsapp://send?text=%C2%A1Estoy%20formando%20parte%20de%20*%23AQuienVotas*%2C%20la%20estad%C3%ADstica%20transparente%20para%20las%20elecciones%202019%20m%C3%A1s%20grande%20de%20la%20Argentina!%20https%3A%2F%2Fwww.aquienvotas.com')
        event.target.appendChild(link)
        link.click()
        event.target.removeChild(link)
        break
      default:
        break
    }

    this.props.closeHandler()
  }

  render() {
    return (
      <Modal closeHandler={ this.props.closeHandler }>
        <Container>
          <FontAwesomeIcon icon="heart" />
          <h3>Gracias por votar</h3>
          <p>¡Ya sos parte de la encuesta transparente más grande de la Argentina! Ayudanos a que más gente se sume a esta estadística abierta y permanente.</p>
          
          <button id="twitter" onClick={ this.handleShare }><FontAwesomeIcon icon={['fab', 'twitter']} /> Compartir en Twitter</button>
          <button id="facebook" onClick={ this.handleShare }><FontAwesomeIcon icon={['fab', 'facebook']} /> Compartir en Facebook</button>
          { /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? <button id="whatsapp" onClick={ this.handleShare }><FontAwesomeIcon icon={['fab', 'whatsapp']} /> Compartir en WhatsApp</button> : '' } 
          <button onClick={ this.props.closeHandler }>Saltar a los resultados</button>

          <ul>
            <li><FontAwesomeIcon icon="user-secret" /> <span><strong>Privado</strong> Nuestro servidor no recibe ni almacena los datos de tus redes sociales.</span></li>
            <li><FontAwesomeIcon icon="lock" /> <span><strong>Secreto</strong> Al compartir no estás mostrando tu voto, sólo la encuesta de #AQuienVotas.</span></li>
          </ul>
        </Container>
      </Modal>
    )
  }
}

Share.propTypes = {
  closeHandler: PropTypes.func.isRequired
}

export default Share
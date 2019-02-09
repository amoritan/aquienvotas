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
  a {
    display: block;
    padding: .5em 1em;
    color: #fefefe;
    text-decoration: none;
    text-align: center;
    border-radius: .25em;
    margin: .25em 0;
    svg {
      color: #fefefe;
      margin-right: .5em;
      font-size: 1.25em;
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
    
    this.facebookShare = this.facebookShare.bind(this)
  }

  facebookShare(event) {
    event.preventDefault()

    window.FB.ui({
      method: 'share',
      href: 'https://www.aquienvotas.com'
    }, function(response){})

    this.props.closeHandler()
  }

  render() {
    return (
      <Modal closeHandler={ this.props.closeHandler }>
        <Container>
          <FontAwesomeIcon icon="heart" />
          <h3>Gracias por votar</h3>
          <p>¡Ya sos parte de la encuesta transparente más grande de la Argentina! Ayudanos a que más gente se sume a esta estadística abierta y permanente.</p>
          
          { /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? <a style={ { background: '#25d366' } } onClick={ this.props.closeHandler } href="whatsapp://send?text=%C2%A1Estoy%20formando%20parte%20de%20*%23AQuienVotas*%2C%20la%20estad%C3%ADstica%20transparente%20para%20las%20elecciones%202019%20m%C3%A1s%20grande%20de%20la%20Argentina!%20https%3A%2F%2Fwww.aquienvotas.com"><FontAwesomeIcon icon={['fab', 'whatsapp']} /> Compartir en WhatsApp</a> : '' } 
          <a style={ { background: '#00aced' } } onClick={ this.props.closeHandler } href="https://twitter.com/intent/tweet?text=%C2%A1Estoy%20formando%20parte%20de%20la%20estad%C3%ADstica%20transparente%20para%20las%20%23Elecciones2019%20m%C3%A1s%20grande%20de%20la%20Argentina!&url=https://www.aquienvotas.com&hashtags=AQuienVotas&related=aquienvotas"><FontAwesomeIcon icon={['fab', 'twitter']} /> Compartir en Twitter</a>
          <a style={ { background: '#3b5998' } } href="#" onClick={ this.facebookShare }><FontAwesomeIcon icon={['fab', 'facebook']} /> Compartir en Facebook</a>
          <button onClick={ this.facebookShare }>Saltar a los resultados</button>
          
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

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
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { lighten } from 'polished'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faUserSecret, faLock } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from './Modal'

library.add(faHeart, faUserSecret, faLock)
library.add(faTwitter, faFacebook, faWhatsapp)

const Container = styled.div`
  max-height: calc(100vh - 6em);
  color: #1e1e1e;
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

function Share(props) {

  function handleShare(event) {
    const link = document.createElement('a')

    switch (event.target.id) {
      case 'twitter':
        link.setAttribute('href', 'https://twitter.com/intent/tweet?text=%F0%9F%97%B3%20%C2%A1Mir%C3%A1%20los%20resultados%20de%20la%20encuesta%20para%20las%20%23Elecciones2019%20m%C3%A1s%20grande%20de%20la%20Argentina!&url=https://www.aquienvotas.com&hashtags=AQuienVotas&related=aquienvotas')
        link.setAttribute('target', '_blank')
        event.target.appendChild(link)
        link.click()
        event.target.removeChild(link)
        break
      case 'facebook':
        link.setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=www.aquienvotas.com')
        link.setAttribute('target', '_blank')
        event.target.appendChild(link)
        link.click()
        event.target.removeChild(link)
        break
      case 'whatsapp':
        link.setAttribute('href', 'whatsapp://send?text=%F0%9F%97%B3%20%C2%A1Mir%C3%A1%20los%20resultados%20de%20*%23AQuienVotas*%2C%20la%20encuesta%20para%20las%20elecciones%202019%20m%C3%A1s%20grande%20de%20la%20Argentina!%20https%3A%2F%2Fwww.aquienvotas.com')
        event.target.appendChild(link)
        link.click()
        event.target.removeChild(link)
        break
      default:
        break
    }
    
    window.gtag('event', 'share', { method: event.target.id })

    props.closeHandler()
  }

  return (
    <Modal closeHandler={ props.closeHandler }>
      <Container>
        <FontAwesomeIcon icon="heart" />
        <h3>{ props.title }</h3>
        <p>¡Difundí la encuesta! Ayudanos a que los resultados sean cada vez más representativos.</p>
        
        <button id="twitter" onClick={ handleShare }><FontAwesomeIcon icon={['fab', 'twitter']} /> Compartir en Twitter</button>
        <button id="facebook" onClick={ handleShare }><FontAwesomeIcon icon={['fab', 'facebook']} /> Compartir en Facebook</button>
        { /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? <button id="whatsapp" onClick={ handleShare }><FontAwesomeIcon icon={['fab', 'whatsapp']} /> Compartir en WhatsApp</button> : '' } 
        <button onClick={ props.closeHandler }>Saltar a los resultados</button>

      </Container>
    </Modal>
  )
}

Share.propTypes = {
  title: PropTypes.string,
  closeHandler: PropTypes.func.isRequired
}

Share.defaultProps = {
  title: 'Gracias por votar'
}

export default Share

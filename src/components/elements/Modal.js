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



import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { transparentize } from 'polished'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
const slideIn = keyframes`
  from { transform: translateY(-50%); }
  to { transform: translateX(0); }
`
const Background = styled.aside`
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 1000;
  background: ${transparentize(0.1, '#1e1e1e')};
  animation: ${fadeIn} 1s ease;
`
const Close = styled.button`
  display: block;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: none;
  border: none;
`
const Container = styled.div`
  margin: 2em auto;
  width: calc(100% - 6em);
  max-width: 24em;
  background: #fefefe;
  padding: 1em;
  border-radius: .5em;
  position: relative;
  animation: ${slideIn} 1s ease;
`

class Modal extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.closeHandler()
  }

  render() {
    return (
      <Background>
        <Close onClick={ this.handleClose } />
        <Container>
          { this.props.children }
        </Container>
      </Background>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func.isRequired
}

export default Modal

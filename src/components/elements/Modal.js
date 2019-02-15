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

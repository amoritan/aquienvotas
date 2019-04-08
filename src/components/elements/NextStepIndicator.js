import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import { animateScroll } from 'react-scroll'

const slideIn = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`
const slideOut = keyframes`
  from { transform: translateY(0%); }
  to { transform: translateY(100%); }
`

const stripes = keyframes`
  to { background-position: -12em 0; }
`

const Container = styled.button`
  position: fixed;
  right: 0; bottom: 0; left: 0;
  z-index: 100;
  background: #00d569;
  color: #fefefe;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5em;
  border: none;
  cursor: pointer;
  background-image: linear-gradient( 135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), linear-gradient(#00d569, #00d569);
  background-size: 8em 4em, 100% 100%, 100% 100%;
  box-shadow: 0 -.25em 1em rgba(0,0,0,.25);
  animation: ${slideIn} 1s ease, ${stripes} 5s linear infinite;
  ${props => props.hidden && css`
    animation: ${slideOut} 1s ease both;
  `};
`

class NextStepIndicator extends Component {
  constructor(props) {
    super(props)

    this.state = { hidden: false }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ hidden: true })
    animateScroll.scrollTo(document.getElementById(this.props.destination).offsetTop - 100, { duration: 500, smooth: true })
  }

  componentDidUpdate(prevProps) {
    if (this.props.destination !== prevProps.destination) {
      this.setState({ hidden: false })
    }
  }

  render() {
    return (
      <Container onClick={ this.handleClick } hidden={ this.state.hidden }>
        { this.props.action }
      </Container>
    )
  }
}

NextStepIndicator.propTypes = {
  action: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired
}

export default NextStepIndicator

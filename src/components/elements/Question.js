import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Container = styled.li`
  margin: 0;
  padding: 0;
  h3 {
    font-size: 1.25em;
    font-weight: 400;
    color: #fefefe;
    margin: 0;
    padding: 1em 1rem;
    cursor: pointer;
  }
  div {
    background: #fefefe;
    color: #1e1e1e;
    overflow: hidden;
    transition: all .5s;
    transform: scaleY(0);
    transform-origin: center top;
    max-height: 0;
    line-height: 1.5em;
    p {
      margin: 1em;
    }
    a {
      color: #0095d5;
    }
    strong {
      font-weight: 600;
    }
    ul {
      list-style: none;
      margin: 1em;
      padding: 0;
      li {
        margin: .5em 0;
        padding: 0;
        display: flex;
        a {
          min-width: 8em;
        }
      }
    }
  }
  ${props => props.open && css`
    div { transform: scaleY(1); max-height: 48em; }
  `};
`

class Question extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(state => {
      return { open: !state.open }
    })
    window.gtag('event', 'view', { event_category: 'faq', event_label: this.props.title })
  }

  render() {
    return (
      <Container open={ this.state.open }>
        <h3 onClick={ this.handleClick }>{ this.props.title }</h3>
        <div>{ this.props.children }</div>
      </Container>
    )
  }
}

Question.propTypes = {
  title: PropTypes.string.isRequired
}

export default Question
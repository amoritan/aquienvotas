import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'

const Container = styled.li`
  margin: .5em;
  padding: 0;
  button {
    color: #fefefe;
    background: ${ props => props.color };
    border: .125em solid ${ props => props.color };
    border-radius: 2em;
    font-size: 1em;
    font-weight: 700;
    padding: .5em 1em;
    width: 100%;
    text-align: center;
    cursor: pointer;
    transition: all .25s;
    &:hover {
      background: ${ props => transparentize(.85, props.color) };
      color: ${ props => props.color };
    }
  }
`

class Option extends Component {
  constructor(props) {
    super(props)

    this.handleVote = this.handleVote.bind(this)
  }

  handleVote() {
    this.props.voteHandler(this.props.data)
  }

  render() {
    return (
      <Container color={ `#${ this.props.data.color }` }>
        <button onClick={ this.handleVote }>{ this.props.data.name }</button>
      </Container>
    )
  }
}

Option.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    result: PropTypes.number,
  }).isRequired,
  voteHandler: PropTypes.func.isRequired
}

export default Option

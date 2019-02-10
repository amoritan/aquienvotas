import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4em;
  margin: .5em 0;
  border-radius: 4em .5em .5em 4em;
  background: #fefefe;
  img {
    display: block;
    margin: 0;
    width: 4em;
    height: 4em;
    border: .125em solid ${ props => props.color };
    border-radius: 100%;
    position: relative;
    z-index: 2;
  }
  div {
    width: 100%;
    h4 {
      font-size: 1em;
      font-weight: 600;
      vertical-align: middle;
      margin 0 .25em .25em .25em;
      color: #1e1e1e;
    }
    i {
      color: ${ props => props.color };
      &::before {
        background: ${ props => transparentize(.4, props.color) };
      }
    }
  }
`
const Progress = styled.i`
  display: flex;
  align-items: center;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 1.25em;
  ::before {
    content: '';
    display: block;
    width: ${ props => props.percentage }%;
    height: 1em;
    border: .125em solid;
    border-radius: 1em;
    padding: 0 1em;
    position: relative;
    left: -.5em;
    box-sizing: border-box;
  }
`

class CandidateResult extends Component {
  constructor(props) {
    super(props)

    this.state = { percentage: parseFloat(`0.${String(this.props.data.result).split('.')[1]}`) }
  }

  componentDidMount() {
    const _this = this;
    const growingNumber = window.setInterval(function() {
      _this.setState((state) => {
        if (state.percentage < _this.props.data.result) {
          return { percentage: state.percentage + 1 }
        } else {
          clearInterval(growingNumber)
        }
      })
    }, 10)
  }

  render() {
    return (
      <Container color={ `#${ this.props.data.color || this.props.partyColor }` } percentage={ this.props.data.result }>
        <img src="https://via.placeholder.com/240" alt={ this.props.data.name } width="120" height="120" />
        <div>
          <h4>{ this.props.data.name }</h4>
          <Progress percentage={ this.state.percentage }>{ this.state.percentage } %</Progress>
        </div>
      </Container>
    )
  }
}

CandidateResult.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string,
    result: PropTypes.number.isRequired,
  }).isRequired,
  partyColor: PropTypes.string.isRequired
}

export default CandidateResult

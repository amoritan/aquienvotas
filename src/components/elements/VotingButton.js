import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faVoteYea, faVoteNay } from '@fortawesome/pro-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getToken } from '../../redux/selectors'

library.add(faVoteYea, faVoteNay)

const Button = styled.button`
  margin-top: 1em;
  color: #fefefe;
  background: ${ props => props.color };
  border: .125em solid ${ props => props.color };
  border-radius: 2em;
  font-size: 1em;
  font-weight: 700;
  padding: .5em;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background: none;
    color: ${ props => props.color };
  }
  ${props => props.percentage && css`
    background: none;
    background-image: ${ props => `linear-gradient(90deg, ${ props.color } 0%, ${ props.color } ${ props.percentage }%, #fefefe ${ props.percentage }%, #fefefe 100%)` };
    height: 2.5em;
    overflow: hidden;
    &::before {
      content: ${ props => `'${ props.percentage } %'` };
      display: block;
      margin-bottom: 1em;
      background-image: ${ props => `linear-gradient(90deg, #fefefe 0%, #fefefe ${ props.percentage }%, ${ props.color } ${ props.percentage }%, ${ props.color } 100%)` };
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: ${ props => darken(0.25, props.color) };
    }
    &:hover {
      &::before {
        display: none;
      }
    }
  `};
`

class VotingButton extends Component {
  constructor(props) {
    super(props)

    this.voteVotingButton = this.voteVotingButton.bind(this)
  }

  voteVotingButton() {
    if (this.props.token) {
      console.log(`Voted for ${this.props.candidate}!`)
    } else {
      console.log('Not authenticated yet!')
    }
  }

  render() {
    return (
      <Button onClick={ this.voteVotingButton } color={ this.props.color } percentage={ this.props.percentage }>
        { this.props.percentage ? <span><FontAwesomeIcon icon="vote-nay" />  Cambiar voto</span> : <span><FontAwesomeIcon icon="vote-yea" /> Votar</span> }
      </Button>
    )
  }
}

VotingButton.propTypes = {
  candidate: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  percentage: PropTypes.number
}

export default connect(state => ({ token: getToken(state) }))(VotingButton)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getToken } from '../../redux/selectors'

class Candidate extends Component {
  constructor(props) {
    super(props)

    this.voteCandidate = this.voteCandidate.bind(this)
  }

  voteCandidate() {
    if (this.props.token) {
      console.log(`Voted for ${this.props.name}!`)
    } else {
      console.log('Not authenticated yet!')
    }
  }

  render() {
    return (
      <article style={{color: `#${this.props.color}`}}>
        <h3>{ this.props.name }</h3>
        <h4>{ this.props.party }</h4>
        <button onClick={this.voteCandidate}>Vote</button>
      </article>
    )
  }
}

export default connect(state => ({ token: getToken(state) }))(Candidate)

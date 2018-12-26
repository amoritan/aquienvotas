import React, { Component } from 'react'

class Candidate extends Component {
  constructor(props) {
    super(props)

    this.voteCandidate = this.voteCandidate.bind(this)
  }

  voteCandidate() {
    console.log(`Voted for ${this.props.name}!`)
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

export default Candidate

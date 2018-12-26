import React, { Component } from 'react'
import Candidate from '../elements/Candidate'
import axios from 'axios'

class Voting extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      name: this.props.name,
      candidates: []
    }
  }

  componentDidMount() {
    const _this = this
    axios.get(`/ballots/${_this.props.endpoint}`).then( response => {
      _this.setState({
        id: response.data.id,
        name: response.data.name,
        candidates: response.data.candidates
      })
      console.log(response)
    }).catch( error => {
      console.error(error)
    })
  }

  render() {
    const candidates = this.state.candidates.map((candidate) => <Candidate key={candidate.id} name={candidate.name} party={candidate.party.name} color={candidate.party.color} />)
    return (
      <section>{ candidates }</section>
    )
  }
}

export default Voting

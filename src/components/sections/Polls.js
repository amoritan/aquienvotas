import React, { Component } from 'react'
import axios from 'axios'

import Poll from '../elements/Poll'

class Polls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      polls: []
    }

    this.fetchPolls = this.fetchPolls.bind(this)
  }

  componentDidMount() {
    this.fetchPolls()
  }

  fetchPolls(id) {
    const _this = this
    axios.get('/polls').then( response => {
      _this.setState({
        polls: response.data
      })
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  render() {
    return (
      <div>
        { this.state.polls.map((poll) => <Poll key={ poll.id } data={ poll } />) }
      </div>
    )
  }
}

export default Polls

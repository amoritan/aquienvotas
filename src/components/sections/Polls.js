////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////                                                                                ////
////  This file is part of AQuienVotas.                                             ////
////                                                                                ////
////  AQuienVotas is free software: you can redistribute it and/or modify           ////
////  it under the terms of the GNU Affero General Public License as published by   ////
////  the Free Software Foundation, either version 3 of the License, or             ////
////  any later version.                                                            ////
////                                                                                ////
////  AQuienVotas is distributed in the hope that it will be useful,                ////
////  but WITHOUT ANY WARRANTY; without even the implied warranty of                ////
////  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                  ////
////  GNU Affero General Public License for more details.                           ////
////                                                                                ////
////  You should have received a copy of the GNU Affero General Public License      ////
////  along with AQuienVotas. If not, see <https://www.gnu.org/licenses/>.          ////
////                                                                                ////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



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
      <div id="polls">
        { this.state.polls.map((poll) => <Poll key={ poll.id } data={ poll } />) }
      </div>
    )
  }
}

export default Polls

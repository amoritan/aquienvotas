import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import { transparentize } from 'polished'

import Argentina from '../elements/Argentina'

import Section from '../styled/Section'

const Container = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 60%;
    height: 100%;
  }
  div {
    width: 40%;
    margin-bottom: 6em;
    position: relative;
    right: 1em;
    h3 {
      font-size: 1em;
      font-weight: 600;
      color: #fefefe;
      margin: 0;
    }
    strong {
      font-size: 2em;
      font-weight: 600;
      color: #0095d5;
    }
  }
`

class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: [],
      activeLocation: undefined
    }

    this.fetchLocations = this.fetchLocations.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.fetchLocations()
  }

  fetchLocations() {
    const _this = this
    axios.get('/users/locations').then( response => {
      _this.setState({
        locations: response.data,
        activeLocation: response.data[0]
      })
    }).catch( error => {
      console.error(error)
    })
  }

  handleClick(event) {
    let activeLocation = this.state.locations.find( locations => locations.code === event.target.parentNode.id )
    this.setState({
      activeLocation: activeLocation
    })
  }

  render() {
    return (
      <Section>
        <Container>
          <Argentina clickHandler={ this.handleClick } active={ this.state.activeLocation ? this.state.activeLocation.code : '' } />
          { this.state.activeLocation ? (
            <div>
              <h3>{ this.state.activeLocation.name }</h3>
              <strong>{ this.state.activeLocation.total } %</strong>
            </div>
          ) : '' }
        </Container>
      </Section>
    )
  }
}

export default Map

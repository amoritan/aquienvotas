import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-scroll'

import { update } from '../../redux/actions'
import { getUser } from '../../redux/selectors'

import Candidate from '../elements/Candidate'

import Section from '../styled/Section'
import SectionTitle from '../styled/SectionTitle'
import BlurredQuestion from '../styled/BlurredQuestion'

import Select from '../inputs/Select'
import Submit from '../inputs/Submit'

const placeholderCandidates = [
  {
    id: 'a',
    name: 'Nombre de Ejemplo',
    description: 'Nombre de Ejemplo',
    color: null,
    result: null,
    party: {
      id: 'a',
      name: 'Partido de Ejemplo',
      description: 'Partido de Ejemplo',
      color: 'feb600',
      result: null
    }
  },
  {
    id: 'b',
    name: 'Nombre de Ejemplo',
    description: 'Nombre de Ejemplo',
    color: null,
    result: null,
    party: {
      id: 'b',
      name: 'Partido de Ejemplo',
      description: 'Partido de Ejemplo',
      color: '50ade6',
      result: null
    }
  },
  {
    id: 'c',
    name: 'Nombre de Ejemplo',
    description: 'Nombre de Ejemplo',
    color: null,
    result: null,
    party: {
      id: 'c',
      name: 'Partido de Ejemplo',
      description: 'Partido de Ejemplo',
      color: '004991',
      result: null
    }
  },
  {
    id: 'd',
    name: 'Nombre de Ejemplo',
    description: 'Nombre de Ejemplo',
    color: null,
    result: null,
    party: {
      id: 'd',
      name: 'Partido de Ejemplo',
      description: 'Partido de Ejemplo',
      color: 'b1292a',
      result: null
    }
  }
]

const Candidates = styled.div`
  filter: blur(.5em);
  opacity: .25;
  display: flex;
  flex-wrap: wrap;
  margin: 0 .5rem;
`

class Province extends Component {
  constructor(props) {
    super(props)

    this.state = {
      provinces: [],
      provinceOptions: [],
      locationOptions: [],
      province: { id: undefined },
      location: { id: undefined }
    }

    this.fetchProvinces = this.fetchProvinces.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchProvinces()
  }

  fetchProvinces() {
    const _this = this
    axios.get('/provinces').then( response => {
      _this.setState({
        provinces: response.data,
        provinceOptions: response.data.map((province) => { return { value: province.id, title: province.name } } )
      })
    }).catch( error => {
      console.error(error)
    })
  }

  handleChange(event) {
    switch (event.target.name) {
      case 'province':
        const province = this.state.provinces.find( province => province.id === event.target.value )
        this.setState({
          province: province
        })
        if (province.locations.length > 1) {
          this.setState({
            locationOptions: province.locations.map((location) => { return { value: location.id, title: location.name } } ),
            location: { id: undefined }
          })
        } else {
          this.setState({
            locationOptions: [],
            location: province.locations[0]
          })
        }
        break
      case 'location':
        const location = this.state.province.locations.find( location => location.id === event.target.value )
        this.setState({
          location: location
        })
        break
      default:
        break
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const _this = this
    axios.put(`/users/${ this.props.user.id }`, {
      location_id: _this.state.location.id
    }).then( response => {
      _this.props.update({ user: response.data })
    }).catch( error => {
      console.error(error)
    })
  }

  render() {
    return (
      <Section id="local">
        <SectionTitle>Elección provincial</SectionTitle>
        <Candidates aria-hidden="true">{ placeholderCandidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } voteHandler={ function() {} } />) }</Candidates>
        { this.props.user ? (
          <BlurredQuestion>
            <h3>¿Dónde votas?</h3>
            <form onSubmit={ this.handleSubmit }>
              <Select placeholder="Elige una provincia" options={ this.state.provinceOptions } selected={ this.state.province.id } changeHandler={ this.handleChange } name="province" required />
              { this.state.locationOptions.length ? <Select placeholder="Elige una opción" options={ this.state.locationOptions } selected={ this.state.location.id } changeHandler={ this.handleChange } name="location" required /> : '' }
              { this.state.location.id ? <Submit title="Guardar" /> : '' }
            </form>
          </BlurredQuestion>
        ) : (
          <BlurredQuestion>
            <p>Para poder ver esta sección, primero debes votar en la <Link to="national" smooth={ true } duration={ 500 }>elección nacional</Link>.</p>
          </BlurredQuestion>
        ) }
      </Section>
    )
  }
}

export default connect(state => ({ user: getUser(state) }), { update })(Province)

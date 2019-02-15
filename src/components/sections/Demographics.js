import React, { Component } from 'react'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import axios from 'axios'
import styled, { css } from 'styled-components'
import { Link } from 'react-scroll'

import { update } from '../../redux/actions'
import { getUser } from '../../redux/selectors'

import DemographicsChart from '../elements/DemographicsChart'
import Argentina from '../elements/Argentina'

import Section from '../styled/Section'
import SectionTitle from '../styled/SectionTitle'
import BlurredQuestion from '../styled/BlurredQuestion'

import Select from '../inputs/Select'
import Submit from '../inputs/Submit'

const placeholderDemographics = [
  {
    code: 'from16to24',
    total: 17.55,
    genders: [
      { code: 'female', group: 47.98, total: 8.41 },
      { code: 'male', group: 52.02, total: 9.12 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from25to39',
    total: 33.47,
    genders: [
      { code: 'female', group: 49.7, total: 16.72 },
      { code: 'male', group: 50.3, total: 16.82 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from40to54',
    total: 24.75,
    genders: [
      { code: 'female', group: 50.41, total: 12.46 },
      { code: 'male', group: 49.59, total: 12.26 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from55to64',
    total: 9.63,
    genders: [
      { code: 'female', group: 53.68, total: 53.68 },
      { code: 'male', group: 46.32, total: 46.32 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'plus65',
    total: 14.5,
    genders: [
      { code: 'female', group: 60.14, total: 8.71 },
      { code: 'male', group: 39.86, total: 5.78 },
      { code: 'other', group: 0, total: 0 }
    ]
  }
]

const Data = styled.div`
  @media (min-width: 48rem) {
    display: flex;
    & > div {
      width: 50%;
    }
    & > article {
      width: 50%;
    }
  }
  ${props => props.locked && css`
    filter: blur(.5em);
    opacity: .25;
  `};
`

const MapContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
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

class Province extends Component {
  constructor(props) {
    super(props)

    this.state = {
      demographics: [],
      ageOptions: [
        { value: 'from16to24', title: 'De 16 a 24' },
        { value: 'from25to39', title: 'De 25 a 39' },
        { value: 'from40to54', title: 'De 40 a 54' },
        { value: 'from55to64', title: 'De 55 a 64' },
        { value: 'plus65', title: 'Mayor de 65' }
      ],
      genderOptions: [
        { value: 'female', title: 'Femenino' },
        { value: 'male', title: 'Masculino' },
        { value: 'other', title: 'Otro' }
      ],
      age: undefined,
      gender: undefined,
      locations: [],
      activeLocation: undefined
    }

    this.canView = this.canView.bind(this)

    this.fetchLocations = this.fetchLocations.bind(this)
    this.fetchDemographics = this.fetchDemographics.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMapClick = this.handleMapClick.bind(this)
  }

  componentDidMount() {
    if (this.canView()) {
      this.fetchLocations()
      this.fetchDemographics()
    } else {
      this.setState({
        demographics: placeholderDemographics
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user && this.canView()) {
      this.fetchLocations()
      this.fetchDemographics()
    }
  }

  canView() {
    return this.props.user && this.props.user.location && this.props.user.age && this.props.user.gender
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

  fetchDemographics() {
    const _this = this
    axios.get('/users/demographics').then( response => {
      _this.setState({
        demographics: response.data,
      })
    }).catch( error => {
      console.error(error)
    })
  }

  handleMapClick(event) {
    let activeLocation = this.state.locations.find( locations => locations.code === event.target.parentNode.id )
    this.setState({
      activeLocation: activeLocation
    })
  }

  handleChange(event) {
    let payload = {}
    payload[event.target.name] = event.target.value
    this.setState(payload)
  }

  handleSubmit(event) {
    event.preventDefault()
    const _this = this
    axios.put(`/users/${ this.props.user.id }`, {
      age: _this.state.age,
      gender: _this.state.gender
    }).then( response => {
      _this.props.update({ user: response.data })
    }).catch( error => {
      console.error(error)
    })
  }

  render() {
    return (
      <Section>
        <SectionTitle>Acerca de los participantes</SectionTitle>
        <Data locked={ !this.canView() } aria-hidden={ !this.canView() }>
          <MapContainer>
            <Argentina clickHandler={ this.handleMapClick } active={ this.state.activeLocation ? this.state.activeLocation.code : '' } />
            { this.state.activeLocation ? (
              <div>
                <h3>{ this.state.activeLocation.name }</h3>
                <strong>{ this.state.activeLocation.total } %</strong>
              </div>
            ) : '' }
          </MapContainer>
          <DemographicsChart demographics={ this.state.demographics } />
        </Data>
        { !this.canView() ? (
          this.props.user && this.props.user.location ? (
            <BlurredQuestion>
              <h3>Acerca de vos...</h3>
              <form onSubmit={ this.handleSubmit }>
                <Select placeholder="Elige un rango etáreo" options={ this.state.ageOptions } selected={ this.state.age } changeHandler={ this.handleChange } name="age" required />
                <Select placeholder="Elige un género" options={ this.state.genderOptions } selected={ this.state.gender } changeHandler={ this.handleChange } name="gender" required />
                { this.state.age && this.state.gender ? <Submit title="Guardar" /> : '' }
              </form>
            </BlurredQuestion>
          ) : (
            <BlurredQuestion>
              <p>Para poder ver esta sección, primero debes votar en la <Link to="local" smooth={ true } duration={ 500 }>elección provincial</Link>.</p>
            </BlurredQuestion>
          )
        ) : '' }
      </Section>
    )
  }
}

export default connect(state => ({ user: getUser(state) }), { update })(Province)

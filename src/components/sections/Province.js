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



import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'

import { Link } from 'react-scroll'

import axios from 'axios'

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

function Province() {

  const [provinces, setProvinces] = useState([])

  const [provinceOptions, setProvinceOptions] = useState([])
  const [locationOptions, setLocationOptions] = useState([])

  const [province, setProvince] = useState(undefined)
  const [location, setLocation] = useState(undefined)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProvinces()
  }, [])

  function fetchProvinces() {
    axios.get('/provinces').then( response => {
      setProvinces(response.data)
      setProvinceOptions(response.data.map((province) => { return { value: province.id, title: province.name } } ))
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  function handleChange(event) {
    switch (event.target.name) {
      case 'province':
        const pickedProvince = provinces.find( province => province.id === event.target.value )
        setProvince(pickedProvince)
        if (pickedProvince.locations.length > 1) {
          setLocationOptions(pickedProvince.locations.map((location) => { return { value: location.id, title: location.name } } ))
          setLocation(undefined)
        } else {
          setLocationOptions([])
          setLocation(pickedProvince.locations[0])
        }
        break
      case 'location':
        const pickedLocation = province.locations.find( location => location.id === event.target.value )
        setLocation(pickedLocation)
        break
      default:
        break
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.put(`/users/${ user.id }`, {
      location_id: location.id
    }).then( response => {
      window.gtag('event', 'location_submitted', { event_category: 'user_info' })
      dispatch({ type: 'UPDATE', payload: { user: response.data } })
    }).catch( error => {
      console.error(error)
      window.gtag('event', 'api', { event_category: 'error', event_label: error })
    })
  }

  return (
    <Section id="local">
      <SectionTitle>Elección provincial</SectionTitle>
      <Candidates aria-hidden="true">{ placeholderCandidates.map((candidate) => <Candidate key={ candidate.id } data={ candidate } voteHandler={ function() {} } />) }</Candidates>
      { user ? (
        <BlurredQuestion>
          <h3>¿Dónde votas?</h3>
          <form onSubmit={ handleSubmit }>
            <Select placeholder="Elige una provincia" options={ provinceOptions } selected={ province ? province.id : undefined } changeHandler={ handleChange } name="province" required />
            { locationOptions.length ? <Select placeholder="Elige una opción" options={ locationOptions } selected={ location ? location.id : undefined } changeHandler={ handleChange } name="location" required /> : '' }
            { location ? <Submit title="Guardar" /> : '' }
          </form>
        </BlurredQuestion>
      ) : (
        <BlurredQuestion>
          <p>Para poder ver esta sección, primero tenes que votar en la <Link to="national" smooth={ true } duration={ 500 }>elección nacional</Link>.</p>
        </BlurredQuestion>
      ) }
    </Section>
  )
}

export default Province

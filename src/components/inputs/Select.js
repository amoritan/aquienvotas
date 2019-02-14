import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.select`
  display: block;
  width: 100%;
  font-size: 1em;
  padding: 1em;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: none;
  color: #fefefe;
  appearance: none;
  margin: .25em 0;
  &:disabled {
    opacity: .6;
  }
`

function Select(props) {
  return (
    <Container value={ props.selected } onChange={ props.changeHandler } name={ props.name }  required={ props.required } disabled={ props.disabled }>
      <option value={ undefined } disabled={ Boolean(props.selected) }>{ props.placeholder }</option>
      { props.options.map((option) => <option key={ option.value } value={ option.value }>{ option.title }</option>) }
    </Container>
  )
}

export default Select
import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 32em;
  color: #fefefe;
  margin: .25em auto;
  position: relative;
  &::after {
    content: '❯';
    display: block;
    position: absolute;
    top: .25em; right: 2em;
    line-height: 3em;
    transform: rotate(90deg);
  }
`
const Input = styled.select`
  display: block;
  width: 100%;
  font-size: 1em;
  padding: 1em;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: none;
  color: #fefefe;
  appearance: none;
  margin: 0;
  &:disabled {
    opacity: .6;
  }
`

function Select(props) {
  return (
    <Container>
      <Input value={ props.selected } onChange={ props.changeHandler } name={ props.name }  required={ props.required } disabled={ props.disabled }>
        <option value={ undefined } disabled={ Boolean(props.selected) }>{ props.placeholder }</option>
        { props.options.map((option) => <option key={ option.value } value={ option.value }>{ option.title }</option>) }
      </Input>
    </Container>
  )
}

export default Select
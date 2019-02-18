import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.input`
  display: block;
  width: 100%;
  max-width: 32em;
  font-size: 1em;
  font-weight: 600;
  padding: 1em;
  border: .125em solid #fefefe;
  border-radius: .25em;
  background: #fefefe;
  color: #1e1e1e;
  appearance: none;
  margin: .25em auto;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    transform: translateY(-.125em);
    box-shadow: 0 .125em .25em rgba(0,0,0,.5);
  }
  &:active {
    transform: translateY(0);
    opacity: .95;
  }
  &:disabled {
    opacity: .6;
  }
`

function Submit(props) {
  return (
    <Container type="submit" value={ props.title } disabled={ props.disabled } />
  )
}

export default Submit
import styled from 'styled-components'

const Button = styled.button`
  color: ${ props => props.primaryColor || '#0095d5' };
  background: ${ props => props.primaryColor || '#fefefe' };
  border: .125em solid ${ props => props.primaryColor || '#fefefe' };
  border-radius: 2em;
  font-size: 1em;
  font-weight: 700;
  padding: .5em 2em;
  min-width: 8em;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background: none;
    color: ${ props => props.primaryColor || '#fefefe' };
  }
`

export default Button

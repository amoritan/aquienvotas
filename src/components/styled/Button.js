import styled from 'styled-components'

const Button = styled.button`
  color: ${ props => props.primaryColor || '#fefefe' };
  background: none;
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
    background: ${ props => props.primaryColor || '#fefefe' };
    color: ${ props => props.secondaryColor || '#0095d5' };
  }
`

export default Button

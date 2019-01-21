import styled from 'styled-components'

const Button = styled.button`
  color: #fefefe;
  background: none;
  border: .125em solid #fefefe;
  border-radius: 2em;
  font-size: 1em;
  font-weight: 700;
  padding: .5em 2em;
  min-width: 8em;
  text-align: center;
  cursor: pointer;
  transition: all .25s;
  &:hover {
    background: #fefefe;
    color: #0095d5;
  }
`

export default Button

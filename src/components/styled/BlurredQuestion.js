import styled from 'styled-components'
import { transparentize } from 'polished'

const BlurredQuestion = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1em;
  color: #fefefe;
  h3 {
    margin: 3rem 1rem;
    font-size: 2em;
    text-align: center;
    z-index: 2;
  }
  form {
    width: calc(100% - 2em);
  }
  p {
    text-align: center;
    font-size: 1.5em;
    a {
      text-decoration: none;
      color: #0095d5;
      cursor: pointer;
    }
  }
  p, form {
    background: ${ transparentize(.6, '#1e1e1e') };
    box-shadow: 0 0 2em 4em ${ transparentize(.6, '#1e1e1e') };
    border-radius: 4em;
  }
`

export default BlurredQuestion

import styled from 'styled-components'

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
  }
  form {
    width: calc(100% - 2em);
  }
  p {
    text-align: center;
    font-size: 1.5em;
    button {
      appearance: none;
      background: none;
      border: none;
      cursor: pointer;
      color: #0095d5;
    }
  }
`

export default BlurredQuestion

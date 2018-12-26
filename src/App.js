import React, { Component } from 'react'
import Voting from './elements/Voting'

class App extends Component {

  render() {
    return (
      <main>
        <Voting name="Elección nacional" endpoint="national" />
      </main>
    )
  }
}

export default App

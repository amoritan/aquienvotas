import React, { Component } from 'react'
import Voting from './components/Voting'
import Authentication from './components/Authentication'

class App extends Component {
  render() {
    return (
      <main>
        <Voting name="Elección nacional" endpoint="national" />
        <Authentication />
      </main>
    )
  }
}

export default App

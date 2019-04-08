import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import store from '../../redux/store'

import Poll from './Poll'

it('renders without crashing', () => {
  const div = document.createElement('div')

  const poll = {
    id: '0',
    name: 'Poll Name',
    poll_options: [
      {
        id: '0',
        name: 'Option Name',
        color: 'f0f0f0'
      }
    ]
  }

  ReactDOM.render(<Provider store={store}><Poll data={ poll } /></Provider>, div)
  ReactDOM.unmountComponentAtNode(div)
})

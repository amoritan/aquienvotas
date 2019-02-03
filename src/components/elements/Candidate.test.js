import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from '../../redux/store'

import Candidate from './Candidate';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const candidate = {
    id: '0',
    name: 'Candidate Name',
    description: 'Candidate Description',
    party: {
      id: '0',
      name: 'Party Name',
      description: 'Party Description',
      color: 'f0f0f0'
    }
  }

  ReactDOM.render(<Provider store={store}><Candidate data={ candidate } /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

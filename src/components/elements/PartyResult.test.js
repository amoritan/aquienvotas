import React from 'react';
import ReactDOM from 'react-dom';

import PartyResult from './PartyResult';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const candidate = {
    id: '0',
    name: 'Candidate Name',
    description: 'Candidate Description',
    color: 'f0f0f0',
    result: 50.00,
    candidates: [
      {
        id: '0',
        name: 'Candidate Name',
        description: 'Candidate Description',
        result: 50.00
      }
    ]
  }

  ReactDOM.render(<PartyResult data={ candidate } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

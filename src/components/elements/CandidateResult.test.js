import React from 'react';
import ReactDOM from 'react-dom';

import CandidateResult from './CandidateResult';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const candidate = {
    id: '0',
    name: 'Candidate Name',
    description: 'Candidate Description',
    result: 50.00
  }

  ReactDOM.render(<CandidateResult data={ candidate } partyColor="f0f0f0" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

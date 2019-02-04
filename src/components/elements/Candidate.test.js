import React from 'react';
import ReactDOM from 'react-dom';

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

  ReactDOM.render(<Candidate data={ candidate } voteHandler={ function() {} } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

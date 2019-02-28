import React from 'react';
import ReactDOM from 'react-dom';

import VotingSelect from './VotingSelect';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const provinces = [
    {
      id: '0',
      name: 'Province Name',
      ballot: {
        id: '0',
        name: 'Ballot Name'
      }
    }
  ]

  ReactDOM.render(<VotingSelect changeHandler={ () => {} } provinces={ provinces } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

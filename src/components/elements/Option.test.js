import React from 'react';
import ReactDOM from 'react-dom';

import Option from './Option';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const option = {
    id: '0',
    name: 'Option Name',
    color: 'f0f0f0'
  }

  ReactDOM.render(<Option data={ option } voteHandler={ () => {} } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

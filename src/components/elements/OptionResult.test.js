import React from 'react';
import ReactDOM from 'react-dom';

import OptionResult from './OptionResult';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const option = {
    id: '0',
    name: 'Option Name',
    color: 'f0f0f0',
    result: 50.00
  }

  ReactDOM.render(<OptionResult data={ option } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

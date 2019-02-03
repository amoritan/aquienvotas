import React from 'react';
import ReactDOM from 'react-dom';

import Voting from './Voting';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Voting name="Test" endpoint="national" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

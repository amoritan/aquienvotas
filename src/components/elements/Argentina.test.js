import React from 'react';
import ReactDOM from 'react-dom';

import Argentina from './Argentina';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Argentina clickHandler={ function() {} } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

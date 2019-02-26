import React from 'react';
import ReactDOM from 'react-dom';

import NextStepIndicator from './NextStepIndicator';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<NextStepIndicator action="Test" destination="test" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

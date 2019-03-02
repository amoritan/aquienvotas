import React from 'react';
import ReactDOM from 'react-dom';

import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<FrequentlyAskedQuestions />, div);
  ReactDOM.unmountComponentAtNode(div);
});

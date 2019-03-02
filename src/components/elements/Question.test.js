import React from 'react';
import ReactDOM from 'react-dom';

import Question from './Question';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Question title="¿Hola?"><p>Hola</p></Question>, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from '../../redux/store'

import VotingButton from './VotingButton';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Provider store={store}><VotingButton candidate="0" color="#f0f0f0" /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

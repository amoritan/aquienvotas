import React from 'react';
import ReactDOM from 'react-dom';

import DemographicsChart from './DemographicsChart';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const demographics = [
  {
    code: 'from16to24',
    total: 17.55,
    genders: [
      { code: 'female', group: 47.98, total: 8.41 },
      { code: 'male', group: 52.02, total: 9.12 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from25to39',
    total: 33.47,
    genders: [
      { code: 'female', group: 49.7, total: 16.72 },
      { code: 'male', group: 50.3, total: 16.82 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from40to54',
    total: 24.75,
    genders: [
      { code: 'female', group: 50.41, total: 12.46 },
      { code: 'male', group: 49.59, total: 12.26 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'from55to64',
    total: 9.63,
    genders: [
      { code: 'female', group: 53.68, total: 53.68 },
      { code: 'male', group: 46.32, total: 46.32 },
      { code: 'other', group: 0, total: 0 }
    ]
  },
  {
    code: 'plus65',
    total: 14.5,
    genders: [
      { code: 'female', group: 60.14, total: 8.71 },
      { code: 'male', group: 39.86, total: 5.78 },
      { code: 'other', group: 0, total: 0 }
    ]
  }
]

  ReactDOM.render(<DemographicsChart demographics={ demographics } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

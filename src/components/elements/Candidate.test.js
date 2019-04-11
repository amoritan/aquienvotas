////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////                                                                                ////
////  This file is part of AQuienVotas.                                             ////
////                                                                                ////
////  AQuienVotas is free software: you can redistribute it and/or modify           ////
////  it under the terms of the GNU Affero General Public License as published by   ////
////  the Free Software Foundation, either version 3 of the License, or             ////
////  any later version.                                                            ////
////                                                                                ////
////  AQuienVotas is distributed in the hope that it will be useful,                ////
////  but WITHOUT ANY WARRANTY; without even the implied warranty of                ////
////  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                  ////
////  GNU Affero General Public License for more details.                           ////
////                                                                                ////
////  You should have received a copy of the GNU Affero General Public License      ////
////  along with AQuienVotas. If not, see <https://www.gnu.org/licenses/>.          ////
////                                                                                ////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////



import React from 'react';
import ReactDOM from 'react-dom';

import Candidate from './Candidate';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const candidate = {
    id: '0',
    name: 'Candidate Name',
    description: 'Candidate Description',
    party: {
      id: '0',
      name: 'Party Name',
      description: 'Party Description',
      color: 'f0f0f0'
    }
  }

  ReactDOM.render(<Candidate data={ candidate } voteHandler={ function() {} } />, div);
  ReactDOM.unmountComponentAtNode(div);
});

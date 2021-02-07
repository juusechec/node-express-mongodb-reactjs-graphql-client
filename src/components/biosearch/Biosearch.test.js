import React from 'react';
import ReactDOM from 'react-dom';
import Biosearch from './Biosearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Biosearch />, div);
  ReactDOM.unmountComponentAtNode(div);
});

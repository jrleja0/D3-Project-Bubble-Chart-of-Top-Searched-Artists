import './styling/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Main, D3Chart} from './components';

ReactDOM.render(
    <Main>
      <D3Chart />
    </Main>,
  document.getElementById('app')
);

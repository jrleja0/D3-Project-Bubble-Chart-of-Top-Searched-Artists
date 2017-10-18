import './styling/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {Main, BubbleChartArtists} from './components';

ReactDOM.render(
    <Main>
      <BubbleChartArtists />
    </Main>,
  document.getElementById('app')
);

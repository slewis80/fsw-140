import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import FilterProvider from './FilterProvider.js';

ReactDOM.render(
      <FilterProvider>
        <App />
      </FilterProvider>,
  document.getElementById('root')
);


import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import { CarDealTabPanel } from './components/CarDealTabPanel/CarDealTabPanel';

export const App = () => {
  return (
    <Provider store={store}>
      <div id='app-root'>
        <div className='main-logo'>
          Welcome to Crazy Ivan Motors
        </div>

        <div className='screens'>
          <CarDealTabPanel />
        </div>
      </div>
    </Provider>
  )
};


import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { TabPanel } from './components/TabPanel/TabPanel';
import store from './store';

export const App = () => {
  return (
    <Provider store={store}>
      <div id='app-root'>
        <div className='main-logo'>
          Welcome to Crazy Ivan Motors
        </div>

        <div className='screens'>
          <TabPanel />
        </div>
      </div>
    </Provider>
  )
};


import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';
import Routes from './routes';

import './config/reactotron';

import GlobalSytle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalSytle />
    </Router>
  );
}

export default App;

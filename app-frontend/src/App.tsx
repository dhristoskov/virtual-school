import React, { Fragment } from 'react';

import './App.scss'

import Dashboard from './pages/Dashboard/Dashboard';
import DataContextProvider from './context/DataContext';

const App:React.FC = () => {
  return (
    <Fragment>
      <DataContextProvider>
         <Dashboard />
      </DataContextProvider>
    </Fragment>
  );
}

export default App;

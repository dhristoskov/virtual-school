import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss'

import DataContextProvider from './context/DataContext';
import Header from './components/Header/Header';
import SideMenu from './components/SideMenu/SideMenu';
import Subjects from './components/Subjects/Subjects';
import Teachers from './components/Teachers/Teachers';

const App:React.FC = () => {

  const AdminRoute = () => ( 
    <DataContextProvider>
      <div style={{ display: 'flex'}}>
          <SideMenu />
          <Switch>
              <Route path='/admin/subjects' component={Subjects}/>
              <Route path='/admin/teachers' component={Teachers}/>
          </Switch>
      </div>  
    </DataContextProvider>
  );

  return (
    <Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path='/admin' component={AdminRoute} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;

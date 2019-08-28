import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainHeader from './components/mainheader' 
import Home from './pages/home'
import NewList from './components/newlist';
import Lists from './components/lists';
import ListCard from './components/listcard';

import './App.css';

const Routes = props => {
  return (
    <Fragment>
      <MainHeader logout={props.signOut} />
      <Switch>
        <Route path='/app' exact component={Home} />
        <Route path='/app/lists' component={Lists} />
        <Route path='/app/new-list' component={NewList} />
        <Route path='/app/open-list/:id' component={ListCard} />
      </Switch>
    </Fragment>
  );
}

export default Routes;
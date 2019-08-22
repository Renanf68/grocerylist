import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainHeader from './MainHeader' 
import Home from '../home'
import ListCard from '../../components/listcard';

import './styles.css'

const Main = props => {
  return (
    <Router>
      <MainHeader logout={props.logout} />
      <Switch>
        <Route path='/' exact component={() => <Home />}/>} />
        <Route path='/list/:id' component={ListCard}/>} />
      </Switch>
    </Router>
  )
}

export default Main
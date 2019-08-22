import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainHeader from './MainHeader' 
import ListCard from '../../components/listcard';

import './styles.css'

const Main = props => {
  return (
    <Router>
      <MainHeader logout={props.logout} />
      <Switch>
        <Route path='/' exact component={() => <h1>Main</h1>}/>} />
        <Route path='/list/:id' component={ListCard}/>} />
      </Switch>
    </Router>
  )
}

export default Main
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainHeader from './MainHeader' 
import Home from '../home'
import NewList from '../../components/newlist';
import Lists from '../../components/lists';
import ListCard from '../../components/listcard';

import './styles.css'

const Main = props => {
  console.log(props)
  return (
    <Fragment>
      <MainHeader logout={props.logout} />
      <Route path='/app' exact component={Home} />
      <Route path='/app/new-list' component={NewList} />
      <Route path='/app/lists' component={Lists} />
      <Route path='/app/open-list/:id' component={ListCard} />
    </Fragment>
  )
}

export default Main
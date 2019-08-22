import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'reactstrap'
import { MdExitToApp } from 'react-icons/md'
import ListCard from '../../components/listcard';
import Logo from './logo.svg'
import './styles.css'

const Main = props => {
  if(!props.user) {
    return <Redirect to='/' />
  }
  return (
    <Fragment>
      <div className='main-navbar'>
        <Row>
          <Col xs={6} className='nav-logo-container'>
            <img src={Logo} id='logo' />
          </Col>
          <Col xs={6} className='nav-logout-container'>
            <button onClick={props.logout}
              id='logout-btn' title='Sair'>
              <MdExitToApp />
            </button>
          </Col>
        </Row>
      </div>
      <ListCard />
    </Fragment>
  )
}

export default Main
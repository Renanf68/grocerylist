import React from 'react'
import { Col, Row } from 'reactstrap'
import { MdExitToApp } from 'react-icons/md'
import { FaShoppingBag } from 'react-icons/fa' 

const MainHeader = props => {
  return (
    <div className='main-navbar'>
      <Row>
        <Col xs={6} className='nav-logo-container'>
          <button onClick={() => {}}
            id='logo' title='Menu'>
            <FaShoppingBag />
          </button>
        </Col>
        <Col xs={6} className='nav-logout-container'>
          <button onClick={props.logout}
            id='logout-btn' title='Sair'>
            <MdExitToApp />
          </button>
        </Col>
      </Row>
    </div>
  )
}

export default MainHeader
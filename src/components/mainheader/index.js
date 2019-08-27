import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp } from 'react-icons/md'
import { FaShoppingBag } from 'react-icons/fa' 
import './styles.css'

/*const MainHeader2 = props => {
  return (
    <div className='main-navbar'>
      <div className='nav-logo-container'>
        <button id='nav-logo' title='Menu'>
          <Link to='/app'><FaShoppingBag /></Link>
        </button>
      </div>
      <div className='nav-logout-container'>
        <button onClick={props.logout}
          id='logout-btn' title='Sair'>
          <MdExitToApp />
        </button>
      </div>
    </div>
  )
}*/

const MainHeader = props => {
  return (
    <Fragment>
      <div className='nav-icon nav-logo'>
        <button id='nav-logo' title='Menu'>
          <Link to='/app'><FaShoppingBag /></Link>
        </button>
      </div>
      <div className='nav-icon nav-logout'>
        <button onClick={props.logout}
          id='logout-btn' title='Sair'>
          <MdExitToApp />
        </button>
      </div>
    </Fragment>
  )
}

export default MainHeader
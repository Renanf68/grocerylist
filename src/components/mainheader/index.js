import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp, MdHelp } from 'react-icons/md'
import { FaShoppingBag } from 'react-icons/fa' 
import './styles.css'

const MainHeader = props => {
  return (
    <Fragment>
      <div className='nav-icon nav-logo'>
        <button id='nav-logo' title='Página inicial'>
          <Link to='/app'><FaShoppingBag /></Link>
        </button>
      </div>
      <div className='nav-icon nav-logout'>
        <button onClick={props.logout}
          id='logout-btn' title='Sair'>
          <MdExitToApp />
        </button>
      </div>
      <div className="nav-help">
        <button id='help' title='Ajuda'>
          <Link to='/app/helps'><MdHelp /></Link>
        </button>
      </div>
    </Fragment>
  )
}

export default MainHeader
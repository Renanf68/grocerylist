import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { MdExitToApp, MdHelp } from 'react-icons/md'
import Logo from '../../images/newlogo.png'
import './styles.css'
import LogoutVerification from '../logoutverification';

const MainHeader = props => {
  const [logoutApp, setLogoutApp] = useState(false)
  return (
    <Fragment>
      <div className='nav-icon nav-logo'>
        <button id='nav-logo' title='Página inicial'>
          <Link to='/app'>
            <img src={Logo} alt="GroceryList"/>
          </Link>
        </button>
      </div>
      <div className='nav-icon nav-logout'>
        <button onClick={() => setLogoutApp(true)}
          id='logout-btn' title='Sair'>
          <MdExitToApp />
        </button>
      </div>
      <div className="nav-help">
        <button id='help' title='Ajuda'>
          <Link to='/app/helps'><MdHelp /></Link>
        </button>
      </div>
      <LogoutVerification 
        show={logoutApp} 
        toggle={() => setLogoutApp(false)}
        logout={props.signOut}
        cancel={() => setLogoutApp(false)}  
      />
    </Fragment>
  )
}

export default MainHeader
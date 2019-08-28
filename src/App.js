import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from './firebaseApp'
import { handleAuthError } from './utils'
import Login from './pages/login'
import Routes from './Routes'

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        localStorage.setItem('user', `${user.uid}`)
        setAuthError(null)
        setIsLogged(true)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })
  }, [])
  const signUp = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch( (error) => {
        const err = handleAuthError(error.code)
        setAuthError(err)
      });
  }
  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch( (error) => {
        const err = handleAuthError(error.code)
        setAuthError(err)
      });
  }
  const signOut = () => {
    localStorage.removeItem('user');
    auth
      .signOut()
      .then( res => {
        setIsLogged(false)
      })
      .catch(
        function(error) {
          console.log('signOut error', error)
        }
      );
  }
  
  if(isLoading) {
    return (
    <div className="App">
      <p>Carregando...</p>
    </div>
    )
  }
  return (
    <div className="App">
      {
        isLogged ? <Redirect to='/app' /> : <Redirect to='/login' />
      }
      <Route path='/login' exact render={() => 
        <Login 
            signUp={signUp} login={signIn} error={authError} 
            clearErr={() => setAuthError(null)}
          />
      }/>
      { isLogged && <Routes signOut={signOut}/> }
    </div>
  );
}

export default App;

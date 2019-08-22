import React, { useState, useEffect } from 'react';
import Login from './pages/login'
import Main from './pages/main';
import firebaseApp, { auth } from './firebaseApp'

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    console.log('useEffect')
    auth.onAuthStateChanged((user) => {
      if(user) {
        setAuthError(null)
        setUser(user.uid)
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
      .catch(
        function(error) {
          if (error.code === 'auth/invalid-email') {
            setAuthError('Formato de email inválido.')
          } else {
            setAuthError('Erro não identificado.')
          }
        }
      );
  }
  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(
        function(error) {
          if(error.code === 'auth/wrong-password') {
            setAuthError('Senha incorreta.')
          } else if (error.code === 'auth/invalid-email') {
            setAuthError('Formato de email inválido.')
          } else if (error.code === 'auth/user-not-found') {
            setAuthError('Usuário não encontrado.')
          } else {
            setAuthError('Erro não identificado.')
          }
        }
      );
  }
  const signOut = () => {
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
  return (
    <div className="App">
      {
        isLoading ? 
          <p>Carregando...</p>
        :
          isLogged ?
            <Main user={user} logout={signOut} />
          :
            <Login signUp={signUp} login={signIn} error={authError} clearErr={() => setAuthError(null)}/>    
      }
    </div>
  );
}

export default App;

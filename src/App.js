import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import firebaseApp, { auth } from './firebaseApp'
import Login from './pages/login'
import MainHeader from './pages/main/MainHeader' 
import Home from './pages/home'
import NewList from './components/newlist';
import Lists from './components/lists';
import ListCard from './components/listcard';

import './App.css';
import { tsPropertySignature } from '@babel/types';

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
      <MainHeader logout={signOut} />
      <Switch>
        <Route path='/app' exact component={Home} />
        <Route path='/app/new-list' component={NewList} />
        <Route path='/app/lists' component={Lists} />
        <Route path='/app/open-list/:id' component={ListCard} />
      </Switch>
    </div>
  );
}

export default App;

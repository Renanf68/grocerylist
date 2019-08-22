import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login'
import Main from './pages/main/Main';
import firebaseApp, { auth } from './firebaseApp'
//import logo from './logo.svg';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [authError, setAuthError] = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
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
          setAuthError(error)
        }
      );
  }
  const signIn = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(
        function(error) {
          console.log(error)
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
      .catch(
        function(error) {
          console.log(error)
        }
      );
  }
  return (
    <div className="App">
      {
        isLoading ? 
          <p>Carregando...</p>
        :
        <Router>
          <Switch>
            <Route path='/' exact component={
              () => <Login signUp={signUp} login={signIn} error={authError} isLogged={isLogged}/>
            } />
            <Route path='/main' component={() => <Main user={user} logout={signOut}/>} />
          </Switch>
        </Router>
      }
    </div>
  );
}

export default App;

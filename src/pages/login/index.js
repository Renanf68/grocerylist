import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

import './styles.css'

const Login = props => {
  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [passwd2, setPasswd2] = useState('')
  const [formErr, setFormErr] = useState(null)
  const signupSubmit = () => {
    if(passwd === passwd2) {
      setFormErr(null)
      return props.signUp(email, passwd)
    } else {
      setFormErr('As senhas não conferem.')
      setPasswd('')
      setPasswd2('')
    }
  }
  const loginSubmit = () => {
    return props.login(email, passwd)
  }
  if(props.isLogged) {
    return <Redirect to='/main' />
  }
  return (
    <div className='login-container'>
      <div className='login-box'>
        <h4>GroceryList</h4>
        { props.error && <Alert color="warning">{props.error}</Alert> }
        { formErr && <Alert color="warning">{formErr}</Alert> }
        {
          login ?
          <Form>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Senha:</Label>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
              />
            </FormGroup>
            <Button 
              color="success"
              className='login-form-btn' 
              onClick={loginSubmit}>
              Entrar
            </Button>
          </Form>
          :
          <Form>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Nova senha:</Label>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password2">Confirmação da senha:</Label>
              <Input
                type="password"
                name="password2"
                placeholder="Senha"
                value={passwd2}
                onChange={(e) => setPasswd2(e.target.value)}
              />
            </FormGroup>
            <Button 
              color="success"
              className='login-form-btn' 
              onClick={signupSubmit}>
              Cadastrar
            </Button>
          </Form>
        }
        {
          login ?
            <p>
              Ainda não possui uma conta, 
              <button 
                onClick={() => setLogin(false)}
                className='btn-signup'
                >
                clique aqui!
              </button>
            </p>
          :
            <p style={{textAlign: 'right'}}> 
              <button 
                onClick={() => setLogin(true)}
                className='btn-signup'
                >
                Cancelar cadastro.
              </button>
            </p>
        } 
      </div>
    </div> 
  )
}

export default Login
import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from "reactstrap";
import CustonAlert from '../../components/custonalert' 
import { handleSignUpError } from '../../utils'

import Logo from '../../images/logo-orange.png'

import './styles.css'

const Login = props => {
  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')
  const [passwd2, setPasswd2] = useState('')
  const [formErr, setFormErr] = useState(null)
  const [sending, setSending] = useState(false)
  const clearMsgs = () => {
    setFormErr(null)
    props.clearErr()
  }
  const clearFields = () => {
    setEmail('')
    setPasswd('')
    setPasswd2('')
  }
  const signUpSubmit = () => {
    const { status, msg } = handleSignUpError(email, passwd, passwd2)
    if(status) {
      setSending(true)
      clearMsgs()
      return props.signUp(email, passwd)
    } else {
      clearMsgs()
      setFormErr(msg)
      setPasswd('')
      setPasswd2('')
    }  
  }
  const loginSubmit = () => {
    setSending(true)
    clearMsgs()
    return props.login(email, passwd)
  }
  const handleSignUp = () => {
    setSending(false)
    clearFields()
    clearMsgs()
    setLogin(!login)
  }
  return (
    <div className='component-wraped'>
      <div className='login-container'>
        <div className='login-logo-container'>
          <img src={Logo} alt="GroceryList"/>
          <h4>GroceryList <span>beta</span></h4>
        </div>
        { props.error && <CustonAlert type='warning'>{props.error}</CustonAlert> }
        { formErr && <CustonAlert type='warning'>{formErr}</CustonAlert> }
        {
          login ?
          <Form className='login-form'>
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
              className='btn-success-default' 
              onClick={loginSubmit}>
              Entrar {
                sending && !props.error && !formErr ? <Spinner color="light" size="sm"/> : null
              }
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
              className='btn-success-default' 
              onClick={signUpSubmit}>
              Cadastrar {
                sending && !props.error && !formErr ? <Spinner color="light" size="sm"/> : null
              }
            </Button>
          </Form>
        }
        {
          login ?
            <p>
              Ainda não possui uma conta? 
              <button 
                onClick={handleSignUp}
                className='btn-signup'
                >
                Clique aqui!
              </button>
            </p>
          :
            <p style={{textAlign: 'right'}}> 
              <button 
                onClick={handleSignUp}
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
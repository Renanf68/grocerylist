import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner
} from "reactstrap";
import { FaShoppingBag } from 'react-icons/fa' 
import { handleSignUpError } from '../../utils'

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
    <div className='login-container'>
      <div className='component-wraped'>
        <div className='login-logo-container'>
          <FaShoppingBag id='login-logo'/>
        </div>
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
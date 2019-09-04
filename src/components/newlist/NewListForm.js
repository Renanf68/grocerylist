import React, { useState, useEffect, createRef } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import InputWithRef from '../inputwithref'
import { MdPlaylistAdd } from 'react-icons/md'
import CustonAlert from '../custonalert'
import { creatId } from '../../utils' 


const NewListForm = props => {
  const [alias, setAlias] = useState('')
  const [formError, setFormError] = useState({status: false, mgs: ''})
  const AliasInputRef = createRef()
  useEffect(() => AliasInputRef.current.focus(), [AliasInputRef])
  function createNewList() {
    const listId = creatId('list')
    const newList = {
      id: listId,
      obj: {
        id: listId,
        alias,
        status: 'open',
        date: '',
        market: '',
        items: {},
        total: ''
      }
    }
    return newList
  }
  function sendList() {
    if(alias === '') {
      setFormError({
        status: true,
        msg: 'Favor informar um apelido.'
      })
      return null
    } 
    const list = createNewList()
    return props.getList(list)
  }
  return (
    <Form>
      { formError.status && <CustonAlert type='warning'>{formError.msg}</CustonAlert> }
      <FormGroup>
        <Label for="qtd">Apelido:</Label>
        <InputWithRef
          ref={AliasInputRef}
          type='text'
          name='alias'
          placeholder='Ex: Lista básica'
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
      </FormGroup>
      <Button 
        className='btn-success-default' color="success" onClick={sendList}>
        Salvar <MdPlaylistAdd />
      </Button>
    </Form>
  )
}

export default NewListForm
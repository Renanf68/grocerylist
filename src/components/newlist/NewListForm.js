import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { MdPlaylistAdd } from 'react-icons/md'
import CustonAlert from '../custonalert'
import { creatId } from '../../utils' 


const NewListForm = props => {
  const [alias, setAlias] = useState('')
  const [formError, setFormError] = useState({status: false, mgs: ''})
  function createNewList() {
    const listId = creatId('list')
    const newList = {
      id: listId,
      obj: {
        id: listId,
        alias,
        status: 'open'
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
        <Input
          type="text"
          name="alias"
          placeholder="Ex: Lista básica"
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
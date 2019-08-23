import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { MdPlaylistAdd as MdNewList } from 'react-icons/md'
import { Redirect } from 'react-router-dom' 


const NewListForm = props => {
  const [alias, setAlias] = useState('')
  function ListObj() {
    const listObj = {
      alias,
      status: 'open',
      date: '',
      market: '',
      total: 0,
      data: []
    }
    return listObj
  }
  function saveList() {
    const list = ListObj()
    // salvar list e obter o id
    console.log(list)
    return props.historyPush('id')
  }
  return (
    <Form>
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
        className='btn-success-default' color="success" onClick={saveList}>
        Salvar <MdNewList />
      </Button>
    </Form>
  )
}

export default NewListForm
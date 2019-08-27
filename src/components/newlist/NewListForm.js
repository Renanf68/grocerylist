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
import { creatId } from '../../utils' 


const NewListForm = props => {
  const [alias, setAlias] = useState('')
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
    const list = createNewList()
    return props.getList(list)
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
        className='btn-success-default' color="success" onClick={sendList}>
        Salvar <MdNewList />
      </Button>
    </Form>
  )
}

export default NewListForm
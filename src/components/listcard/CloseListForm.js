import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  Alert
} from "reactstrap";

const CloseListForm = props => {
  const [date, setDate] = useState('')
  const [market, setMarket] =  useState('')

  function getDate() {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const day = new Date().getDate()
    const date = `${year}-${month < 10 ? '0'+month : month}-${day}`
    return date
  }
  useEffect(() => {
    const newDate = getDate()
    setDate(newDate)
  }, [])
  function sendEndListObj() {

    const obj = {
      date,
      market,
      total: props.total,
      status: 'close'
    }
    return props.getEndObj(obj)
  }
  
  return (
    <Modal isOpen={props.show} toggle={props.toggle} className="component-wraped">
      <div className="new-item-form-header">
        <h4>Concluir lista: "{props.listAlias}"</h4>
        <Button close onClick={props.toggle} />
      </div>
      <Form>
        <FormGroup>
          <Label for="date">Data:</Label>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="market">Mercado:</Label>
          <Input
            type="text"
            name="market"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          />
        </FormGroup>
        <h6>Total: {props.total}</h6>
        <Button 
          className='btn-success-default' color="success" 
          onClick={sendEndListObj}>
          Salvar
        </Button>
      </Form>
      { props.msg.status && <Alert color={`${props.msg.type}`}>{props.msg.message}</Alert> }
    </Modal>
  )
}

export default CloseListForm
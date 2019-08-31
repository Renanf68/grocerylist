import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal
} from "reactstrap";
import CustonAlert from '../custonalert'
import { formDateValidation } from '../../utils'

const CloseListForm = props => {
  const [date, setDate] = useState('')
  const [market, setMarket] =  useState('')
  const [formError, setFormError] = useState({status: false, msg: ''})

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
    const validation = formDateValidation(date)
    if(!validation.status) {
      return setFormError({status: true, msg: validation.msg})
    }
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
        <h4>Encerrar lista: "{props.listAlias}"</h4>
        <Button close onClick={props.toggle} />
      </div>
      <div className="tip">
        <p>* Encerrar a lista após a realização das compras.</p>
      </div>
      <Form>
      { formError.status && <CustonAlert type='warning'>{formError.msg}</CustonAlert> }
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
      { props.msg.status && <CustonAlert type={`${props.msg.type}`}>{props.msg.message}</CustonAlert> }
    </Modal>
  )
}

export default CloseListForm
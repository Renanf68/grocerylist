import React, { useState } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  Alert
} from "reactstrap";
import { getNewItemObj } from '../../utils'
import CurrencyInput from '../currencyinput'


const NewItemForm = props => {
  const [product, setProduct] =  useState('')
  const [category, setCategory] =  useState('food')
  const [qtd, setQtd] =  useState(0)
  const [price, setPrice] =  useState(0)
  function clearFields() {
    setProduct('')
    setCategory('food')
    setQtd(0)
    setPrice(0)
  }
  function sendNewItem() {
    const newItem = getNewItemObj(product, category, qtd, price)
    props.saveNewItemObj(newItem)
    clearFields()
    // receber feedback e informar se foi salvo 
  }
  
  return (
    <Modal isOpen={props.show} toggle={props.toggle} className="component-wraped">
      <div className="new-item-form-header">
        <h4>Novo item</h4>
        <Button close onClick={props.toggle} />
      </div>
      <Form>
        <FormGroup>
          <Label for="prod">Produto:</Label>
          <Input
            type="text"
            name="prod"
            placeholder="Ex: Feijão"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Categoria:</Label>
          <Input
            type="select"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="food">Alimentação</option>
            <option value="hygiene">Higiene</option>
            <option value="cleaning">Limpeza</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="qtd">Qtd.:</Label>
          <Input
            type="number"
            placeholder="0"
            value={qtd}
            onChange={(e) => setQtd(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Preço Unitário:</Label>
          <CurrencyInput
            name="price"
            value={price}
            precision={2}
            onInputChange={value => setPrice(value)}
          />
        </FormGroup>
        <Button 
          className='btn-success-default' color="success" 
          onClick={sendNewItem}>
          Salvar
        </Button>
      </Form>
      { props.msg.status && <Alert color={`${props.msg.type}`}>{props.msg.message}</Alert> }
    </Modal>
  )
}

export default NewItemForm
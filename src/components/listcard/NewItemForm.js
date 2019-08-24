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
import { getNewItemObj } from '../../utils'
import CurrencyInput from '../currencyinput'


const NewItemForm = props => {
  const [itemId, setItemId] = useState(null)
  const [product, setProduct] =  useState('')
  const [category, setCategory] =  useState('food')
  const [qtd, setQtd] =  useState(0)
  const [price, setPrice] =  useState(0)

  useEffect(() => {
    if(props.isEditing.status) {
      const { id, obj } = props.isEditing
      const { product, category, qtd, punit } = obj
      setItemId(id)
      setProduct(product)
      setCategory(category)
      setQtd(qtd)
      setPrice(punit.edit)
    }
  }, [props])
  function clearFields() {
    setItemId(null)
    setProduct('')
    setCategory('food')
    setQtd(0)
    setPrice(0)
  }
  function handleToggle() {
    clearFields()
    if(itemId) {
      props.toggle('exit-edit')
    } else {
      props.toggle('exit')
    }
  }
  function sendNewItem() {
    const newItem = getNewItemObj(itemId, product, category, qtd, price)
    if(props.isEditing.status) {
      props.updateItemObj(newItem)
      handleToggle()
    } else {
      props.saveNewItemObj(newItem)
      clearFields()
    }
  }
  
  return (
    <Modal isOpen={props.show} toggle={handleToggle} className="component-wraped">
      <div className="new-item-form-header">
        <h4>Novo item</h4>
        <Button close onClick={handleToggle} />
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
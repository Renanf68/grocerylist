import React, { useState, useEffect } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal
} from "reactstrap";
import { newItemFormValidation, getNewItemObj } from '../../utils'
import CustonAlert from '../custonalert' 
import CurrencyInput from '../currencyinput'


const NewItemForm = props => {
  const [itemId, setItemId] = useState(null)
  const [product, setProduct] =  useState('')
  const [category, setCategory] =  useState('food')
  const [qtd, setQtd] =  useState(0)
  const [price, setPrice] =  useState(0)
  const [formError, setFormError] = useState({status: false, msg: ''})

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
  }, [props.isEditing])
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
    setFormError({status: false, msg: ''})
    const validation = newItemFormValidation(product, qtd)
    if(!validation.status) {
      return setFormError({status:true, msg: validation.msg})
    }
    const newItem = getNewItemObj(props.listId, itemId, product, category, qtd, price)
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
        <h4>{props.isEditing.status ? 'Editar item' : 'Novo item'}</h4>
        <Button close onClick={handleToggle} />
      </div>
      <Form>
        { formError.status && <CustonAlert type='warning'>{formError.msg}</CustonAlert> }
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
            {
              props.categories.map( 
                cat => <option 
                        key={cat.type} value={`${cat.type}`}>{`${cat.title}`}
                      </option>
              )
            }
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
      { props.msg.status && 
          <CustonAlert type={`${props.msg.type}`}>
            {props.msg.message}
          </CustonAlert> 
      }
    </Modal>
  )
}

export default NewItemForm
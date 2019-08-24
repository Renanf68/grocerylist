import React, { useEffect, useState, useReducer } from 'react'
import { Col, Row } from 'reactstrap'
import { MdPlaylistAdd } from 'react-icons/md'
import { database } from '../../firebaseApp'
import { listCardReducer, initialState } from './listCardReducer';
import ListTable from './ListTable'
import NewItemForm from './NewItemForm'

import './styles.css'

const ListCard = ({ match }) => {
  const [state, dispatch] = useReducer(listCardReducer, initialState);
  // uma abordagem melhor seria criar um contexto colocando o databaseRef já com
  // o usuário setado? E como setaria o listId? R= .child(`/lists/${listId}`)
  const user = localStorage.getItem('user')
  const listId = match.params.id
  const databaseRef = database.ref(`${user}/lists/${listId}`)

  function LoadList() {
    const list = databaseRef.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        dispatch({'type': 'GET_LIST', payload: list })
      })
  }
  useEffect(() => {
    dispatch({'type': 'SET_LIST_ID', payload: listId })
    LoadList()
  }, [])
  const data = [
    {
      product: 'Feijão Macassa',
      category: 'food',
      qtd: 2,
      puni: {
        num: 4.50,
        str: 'R$ 4,50' 
      },
      ptotal: {
        num: 9,
        str: 'R$ 9,00' 
      }
    },
    {
      product: 'Arroz Parbolizado',
      category: 'food',
      qtd: 3,
      puni: {
        num: 2.50,
        str: 'R$ 2,50' 
      },
      ptotal: {
        num: 7.5,
        str: 'R$ 7,50' 
      }
    },
    {
      product: 'Detergente',
      category: 'cleaning',
      qtd: 3,
      puni: {
        num: 2.50,
        str: 'R$ 2,50' 
      },
      ptotal: {
        num: 7.5,
        str: 'R$ 7,50' 
      }
    },
    {
      product: 'Papel Higiênico',
      category: 'hygiene',
      qtd: 3,
      puni: {
        num: 2.50,
        str: 'R$ 2,50' 
      },
      ptotal: {
        num: 7.5,
        str: 'R$ 7,50' 
      }
    }
  ]
  
  function handleNewItemForm(type) {
    if(type === 'exit-edit') {
      dispatch({'type': 'EXIT_EDIT'})
    } else {
      dispatch({'type': 'HANDLE_NEWITEMFORM'})
    }
  }
  function saveNewItemObj(newItem) {
    const { id, obj } = newItem
    databaseRef.child(`items/${id}`)
      .set(obj)
      .then(
        () => {
          dispatch({'type': 'SAVE_ITEM_SUCCESS'})
          return setTimeout(() => dispatch({'type': 'CLEAR_MSG'}), 2000)
        },
        (err) => console.log(err)  
      )
  }
  function editingItemObj(editingItem) {
    dispatch({ 'type': 'EDITING_ITEM', payload: editingItem})
  }
  function updateItemObj(newItem) {
    const { id, obj } = newItem
    databaseRef.child(`items/${id}`)
      .set(obj)
      .then(
        () => {
          dispatch({'type': 'SAVE_ITEM_SUCCESS'})
          return setTimeout(() => dispatch({'type': 'CLEAR_MSG'}), 2000)
        },
        (err) => console.log(err)  
      )
  }
    
  return (
    <div className='component-wraped'>
      <Row>
        <Col xs={6} className='list-header-title'>
          <h4>{state.listAlias}</h4>
        </Col>
        <Col xs={6} className='list-header-btn'>
          <button
            onClick={handleNewItemForm}
            title='Adicionar item' 
            className='btn btn-success'>
            Add Item <MdPlaylistAdd />
          </button>
        </Col>
      </Row>
      <h6>Alimentação</h6>
      <ListTable 
        isLoading={false}
        products={state.food}
        editing={editingItemObj}  
      />
      <h6>Higiene</h6>
      <ListTable 
        isLoading={false}
        products={state.hygiene}
        editing={editingItemObj}   
      />
      <h6>Limpeza</h6>
      <ListTable 
        isLoading={false}
        products={state.cleaning}
        editing={editingItemObj}   
      />
      <Row>
        <Col xs={12} className='list-card-total'>
          <h6>Total Geral: {state.totalToDisplay}</h6>
        </Col>
      </Row>
      <NewItemForm 
        show={state.showNewItemForm}
        toggle={handleNewItemForm}
        isEditing={state.isEdit}
        updateItemObj={updateItemObj} 
        saveNewItemObj={saveNewItemObj}
        msg={state.msg} 
      />
    </div>
  )
}

export default ListCard
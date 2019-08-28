import React, { useEffect, useReducer, Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md'
import { database } from '../../firebaseApp'
import { listCardReducer, initialState } from './listCardReducer';
import ListTable from './ListTable'
import NewItemForm from './NewItemForm'
import CloseListForm from './CloseListForm'
import RemoveVerification from '../removeverification'

import './styles.css'

const ListCard = ({ history, match }) => {
  const [state, dispatch] = useReducer(listCardReducer, initialState);
  const user = localStorage.getItem('user')
  const listId = match.params.id
  const databaseRef = database.ref(`${user}/lists/${listId}`)
  useEffect(() => {
    dispatch({'type': 'SET_LIST_ID', payload: listId })
  }, [listId])
  useEffect(() => {
    databaseRef.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        dispatch({'type': 'GET_LIST', payload: list })
      })
    return () => databaseRef.off()
  }, [])
  function handleNewItemForm(type) {
    if(type === 'exit-edit') {
      return dispatch({'type': 'EXIT_EDIT'})
    } else {
      return dispatch({'type': 'HANDLE_NEWITEMFORM'})
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
    return dispatch({ 'type': 'EDITING_ITEM', payload: editingItem})
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
  function itemRemove(itemId) {
    databaseRef.child(`items/${itemId}`)
      .remove()
      .then(
        () => dispatch({'type': 'EXIT_REMOVING'})
      )
      .catch(
        (err) => console.log('Remove err', err)
      )
  }
  function removeItemConfirm(itemId, product) {
    dispatch({'type': 'IS_REMOVING', payload: {itemId, product}})
  }
  function handleCheck(item) {
    databaseRef.child(`items/${item.id}/`)
      .update({ check: !item.check })
      .catch(
        (err) => console.log('Check err', err)
      )
  }
  function itemsCheckAll() {
    let itemsArr = []
    Array.prototype.push.apply(itemsArr, state.food)
    Array.prototype.push.apply(itemsArr, state.hygiene)
    Array.prototype.push.apply(itemsArr, state.cleaning)
    Array.prototype.push.apply(itemsArr, state.others)
    itemsArr.map( item => {
      return (
        databaseRef.child(`items/${item.id}/`)
          .update({ check: true })
          .catch(
            (err) => console.log('CheckAll err', err)
          )
      )
    })
  }
  function closeList(obj) {
    itemsCheckAll()
    databaseRef.update(obj)
      .then(
        history.push('/app'),
      )
      .catch(
        (err) => console.log('Fechamento de lista err', err)
      )
  }
  const categories = [
    { title: 'Alimentação', type: 'food'},
    { title: 'Higiene', type: 'hygiene'},
    { title: 'Limpeza', type: 'cleaning'},
    { title: 'Outros', type: 'others'}
  ]
  console.log('ANTES')
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
            Item <MdPlaylistAdd />
          </button>
        </Col>
      </Row>
      {
        categories.map( cat => {
          const type = cat.type
          let list
          if(type === 'food'){
            list = state.food
          } else if (type === 'hygiene'){
            list = state.hygiene
          } else if (type === 'cleaning'){
            list = state.cleaning
          } else {
            list = state.others
          }
          return (
            <Fragment key={type}>
              <h6>{cat.title}</h6>
              <ListTable 
                isLoading={false}
                products={list}
                editing={editingItemObj}
                remove={removeItemConfirm}
                itemCheck={handleCheck}  
              />
            </Fragment>
            )
          }
        )
      }
      <Row>
        <Col xs={12} className='list-card-total'>
          <h6>Total Geral: {state.totalToDisplay}</h6>
          <button 
            onClick={() => dispatch({'type': 'HANDLE_CLOSELISTFORM'})}
            title='Fechar lista'
            className=' btn btn-success btn-list-close'>
            Concluir <MdPlaylistAddCheck />
          </button>
        </Col>
      </Row>
      <NewItemForm 
        show={state.showNewItemForm}
        toggle={handleNewItemForm}
        listId={listId}
        categories={categories}
        isEditing={state.isEdit}
        updateItemObj={updateItemObj} 
        saveNewItemObj={saveNewItemObj}
        msg={state.msg} 
      />
      <CloseListForm 
        show={state.showCloseListForm}
        toggle={() => dispatch({'type': 'HANDLE_CLOSELISTFORM'})}
        listAlias={state.listAlias}
        getEndObj={closeList}
        total={state.totalToDisplay}
        msg={state.msg} 
      />
      <RemoveVerification 
        show={state.isRemoving.status}
        toggle={() => dispatch({'type': 'EXIT_REMOVING'})}
        id={state.isRemoving.itemId}
        type='item'
        name={state.isRemoving.product}
        cancel={() => dispatch({'type': 'EXIT_REMOVING'})}
        remove={itemRemove}
      /> 
    </div>
  )
}

export default ListCard
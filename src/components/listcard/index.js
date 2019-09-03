import React, { useEffect, useReducer, Fragment } from 'react'
import { Col, Row, Input, Button } from 'reactstrap'
import { MdPlaylistAdd, MdPlaylistAddCheck, MdLockOutline } from 'react-icons/md'
import { FaEdit, FaUndo } from 'react-icons/fa'
import { database } from '../../firebaseApp'
import { listCardReducer, initialState } from './listCardReducer';
import { concatArrays } from  '../../utils'
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
  function updateListAlias() {
    databaseRef.update({ alias: state.editingAlias.newAlias })
      .then(
        () => {
          dispatch({'type': 'EDIT_ALIAS_SUCCESS'})
        },
        (err) => console.log(err)  
      )
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
    const itemsArr = concatArrays(state.food, state.hygiene, state.cleaning, state.others)
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
  return (
    <div className='component-wraped'>
      <Row>
        <Col xs={8} className='list-header-title'>
        {
          state.editingAlias.status ?
          <div className='editing-alias-container'>
            <Input
              type="text"
              name="editalias"
              value={state.editingAlias.newAlias}
              onChange={(e) => dispatch({type: 'SEND_EDITING_ALIAS', payload: e.target.value})}
            />
            <Button 
              color="success"
              className='edit-list-alias-btn' 
              onClick={updateListAlias}>
              <FaEdit />
            </Button>
            <Button 
              color="warning" 
              className='edit-list-alias-btn'
              onClick={() => dispatch({type: 'EDIT_ALIAS_SUCCESS'})}>
              <FaUndo />
            </Button>
          </div> 
          :
          <h4 onClick={() => dispatch({type: 'EDITING_ALIAS_TRUE'})}>
            {state.isLoading ? 
              'Carregando...' 
              : 
              <span>{state.listAlias} <FaEdit id='edit-list-alias'/></span>
            } 
          </h4>
        }
        </Col>
        <Col xs={4} className='list-header-btn'>
          <button
            onClick={handleNewItemForm}
            title='Adicionar item' 
            className='btn btn-success'>
            Item <MdPlaylistAdd />
          </button>
        </Col>
      </Row>
      <div className='tip'>
        <p>* Suas listas são salvas automaticamente.</p>
      </div>
      {
        !state.isLoading &&
          categories.map( cat => {
            if(state[cat.type].length > 0) {
              return (
                <Fragment key={cat.type}>
                  <h6>{cat.title}</h6>
                  <ListTable 
                    products={state[cat.type]}
                    editing={editingItemObj}
                    remove={removeItemConfirm}
                    itemCheck={handleCheck}  
                  />
                </Fragment>
              )
            } else {
              return null
            }
          })
      }
      {
        state.food.length  < 1 && 
          state.hygiene.length < 1 && 
          state.cleaning.length < 1 && 
          state.others.length < 1 &&
          <div className="list-card-empty">
            <p>Não há itens no momento.</p>
          </div>
      }
      <Row>
        <Col xs={12} className='list-card-total'>
          <h6>Total Geral: {state.totalToDisplay}</h6>
        {
          state.listStatus === 'open' &&
          <button 
            onClick={() => dispatch({'type': 'HANDLE_CLOSELISTFORM'})}
            title='Fechar lista'
            className=' btn btn-success btn-list-close'>
            <MdLockOutline /> <MdPlaylistAddCheck />
          </button>
            
        }
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
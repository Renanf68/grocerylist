import React, { useEffect, useReducer, Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md'
import { database } from '../../firebaseApp'
import { listCardReducer, initialState } from './listCardReducer';
import ListTable from './ListTable'
import NewItemForm from './NewItemForm'
import CloseListForm from './CloseListForm'

import './styles.css'

const ListCard = ({ history, match }) => {
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
  function itemRemove(itemId) {
    databaseRef.child(`items/${itemId}`)
      .remove()
      .then(
        () => console.log('Item removido')
      )
      .catch(
        (err) => console.log('Remove err', err)
      )
  }
  function handleCheck(item) {
    databaseRef.child(`items/${item.id}/`)
      .update({ check: !item.check })
      .then(
        () => console.log('Item check/undo')
      )
      .catch(
        (err) => console.log('Check err', err)
      )
  }
  function closeList(obj) {
    // no form vir com data preenchida e com input pro nome do mercado.
    databaseRef.update(obj)
      .then(
        history.push('/app'),
        () => console.log('Lista fechada!')
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
                remove={itemRemove}
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
    </div>
  )
}

export default ListCard
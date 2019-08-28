import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { database } from '../../firebaseApp'
import toArray from 'lodash.toarray'

import ListsTable from './ListsTable'
import ListsTableItem from './ListsTableItem'
import RemoveVerification from '../removeverification'

const Lists = (props) => {
  const [lists, setLists] = useState([])
  const [copyItems, setCopyItems] = useState({status: false, items: {}})
  const [remove, setRemove] = useState({status: false, list: {}})
  const user = localStorage.getItem('user')
  const databaseRef = database.ref(`${user}/lists/`)
  useEffect(() => {
    databaseRef.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        const ListArr = toArray(list)
        setLists(ListArr)
      })
    return () => databaseRef.off()
  }, [])
  function redirectTolist(listId) {
    return props.history.push(`/app/open-list/${listId}`)
  }
  function copyToNewList(items) {
    return setCopyItems({status: true, items})
  }
  function listRemove(listId) {
    databaseRef.child(`${listId}`)
      .remove()
      .then(
        () => setRemove({status: false, list: {}})
      )
      .catch(
        (err) => console.log('Remove err', err)
      )
  }
  function removeConfirm(listId, type, alias) {
    setRemove({status: true, list: {listId, type, alias}})
  }
  if(copyItems.status) {
    const items = copyItems.items
    return <Redirect to={{ pathname: '/app/new-list',  state: items }} />
  }
  return (
    <div className="component-wraped">
      <h6>Listas</h6>
      <ListsTable>
      {
        lists.map( list => (
          <ListsTableItem
            key={list.id} 
            list={list}
            viewList={redirectTolist}
            copyList={copyToNewList}
            removeList={removeConfirm} 
          />   
        ))
      }
      </ListsTable>
      <RemoveVerification 
        show={remove.status}
        toggle={() => setRemove({status: false, list: {}})}
        id={remove.list.listId}
        type={remove.list.type}
        name={remove.list.alias}
        cancel={() => setRemove({status: false, list: {}})}
        remove={listRemove}
      /> 
    </div>
  )
}

export default Lists
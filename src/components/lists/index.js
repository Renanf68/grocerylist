import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { database } from '../../firebaseApp'
import toArray from 'lodash.toarray'

import ListsTable from './ListsTable'
import ListsTableItem from './ListsTableItem'

const Lists = ({ history }) => {
  const [lists, setLists] = useState([])
  const [copyItems, setCopyItems] = useState({status: false, items: {}})
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
  }, [databaseRef])
  function redirectTolist(listId) {
    return history.push(`/app/open-list/${listId}`)
  }
  function copyToNewList(items) {
    return setCopyItems({status: true, items})
  }
  function listRemove(listId) {
    databaseRef.child(`${listId}`)
      .remove()
      .then(
        () => console.log('Item removido')
      )
      .catch(
        (err) => console.log('Remove err', err)
      )
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
            removeList={listRemove} 
          />   
        ))
      }
      </ListsTable>
    </div>
  )
}

export default Lists
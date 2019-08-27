import React, { useState, useEffect } from 'react'
import { database } from '../../firebaseApp'
import toArray from 'lodash.toarray'

import ListsTable from './ListsTable'
import ListsTableItem from './ListsTableItem'
import { dateFormat } from '../../utils';

const Lists = props => {
  const [lists, setLists] = useState([])
  const user = localStorage.getItem('user')
  const databaseRef = database.ref(`${user}/lists/`)
  useEffect(() => {
    databaseRef.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        const ListArr = toArray(list)
        setLists(ListArr)
      })
  }, [])
  return (
    <div className="component-wraped">
      <h6>Listas</h6>
      <ListsTable>
      {
        lists.map( list => (
          <ListsTableItem
            key={list.id} 
            list={list}
            viewList={() => {}}
            copyList={() => {}}
            removeList={() => {}} 
          />   
        ))
      }
      </ListsTable>
    </div>
  )
}

export default Lists
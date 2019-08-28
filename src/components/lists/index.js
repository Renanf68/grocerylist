import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { database } from '../../firebaseApp'
import { FaEye, FaRegCopy } from 'react-icons/fa'
import toArray from 'lodash.toarray'

import ListsTable from './ListsTable'
import ListsTableItem from './ListsTableItem'
import RemoveVerification from '../removeverification'

import './styles.css'

const Lists = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [lists, setLists] = useState([])
  const [copyItems, setCopyItems] = useState({status: false, items: {}})
  const [remove, setRemove] = useState({status: false, list: {}})
  const user = localStorage.getItem('user')
  const databaseReftoLoad = database.ref(`${user}/lists/`).limitToLast(12)
  const databaseRef = database.ref(`${user}/lists/`)
  useEffect(() => {
    databaseReftoLoad.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        const ListArr = toArray(list).reverse()
        setLists(ListArr)
        setIsLoading(false)
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
      <div className="lists-legend-container">
        <p className='lists-legend'><FaEye /> Visualizar lista.</p>
        <p className='lists-legend'><FaRegCopy /> Copiar items para uma nova lista.</p>
        <p className='lists-legend'>* Será possível visualizar suas 12 ultimas listas.</p>
      </div>
      {
        isLoading ? 
        <p>Carregando...</p>
        :
        <ListsTable>
        {
          lists.length > 0 ?
            lists.map( list => (
              <ListsTableItem
                key={list.id} 
                list={list}
                viewList={redirectTolist}
                copyList={copyToNewList}
                removeList={removeConfirm} 
              />   
            ))
          :
            <tr>
              <td 
                colSpan='10'
                className='empty-list-message'
              >Não há listas no momento.</td>
            </tr> 
        }
        </ListsTable>
      }
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
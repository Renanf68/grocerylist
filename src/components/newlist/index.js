import React, { useState, useEffect } from 'react'
import { database } from '../../firebaseApp'
import { Link } from 'react-router-dom'
import { MdKeyboardBackspace as Back } from 'react-icons/md' 
import NewListForm from './NewListForm'
import { getCopyItemsObj } from '../../utils'

import './styles.css'

const NewList = ({ history, location }) => {
  const [listItems, setListItems] = useState({status: false, items: {}})
  const user = localStorage.getItem('user')
  useEffect(() => {
    const items = location.state
    if(items) {
      setListItems({status: true, items})
    }
  }, [])
  function getItemsToCopy(listId) {
    const newItemsObj = getCopyItemsObj(listItems.items, listId)
    return newItemsObj
  }

  function saveList(list) {
    let { id, obj } = list
    if(listItems.status) {
      const items = getItemsToCopy(id)
      obj = {
        ...obj,
        items
      }
    }
    database
      .ref(`${user}/lists/${id}`)
      .set(obj)
      .then(
        () => history.push(`/app/open-list/${id}`),
        (err) => console.log(err)  
      )
    return 
  }
  return (
    <div className='new-list-form-box'>
      <div className='new-list-form-back'>
        <Link to='/app'>Voltar <Back /></Link>
      </div>
      <div className='component-wraped'>
        <h4>Nova lista</h4>
        <NewListForm getList={saveList} />
      </div>
    </div>
  )
}

export default NewList
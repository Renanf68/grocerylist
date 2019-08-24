import React, { Fragment } from 'react'
import { database } from '../../firebaseApp'
import { Link } from 'react-router-dom'
import { MdKeyboardBackspace as Back } from 'react-icons/md' 
import NewListForm from './NewListForm'

import './styles.css'

const NewList = ({ history }) => {
  const user = localStorage.getItem('user')
  function saveList(list) {
    const { id, obj } = list
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
        <NewListForm getList={saveList}/>
      </div>
    </div>
  )
}

export default NewList
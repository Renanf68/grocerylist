import React, { useState, useEffect, Fragment } from 'react'
import { Button } from 'reactstrap'
import { MdPlaylistAdd as MdNewList, MdContentCopy as MdCopy } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { database } from '../../firebaseApp'
import toArray from 'lodash.toarray'

import './styles.css'

const Home = props => {
  const [isLoading, setIsLoading] = useState(true)
  const [lists, setLists] = useState(false)
  const user = localStorage.getItem('user')
  const databaseRef = database.ref(`${user}/lists/`)
  useEffect(() => {
    databaseRef.on('value', 
      function(snapshot) {
        const list = snapshot.val()
        const ListArr = toArray(list)
        if(ListArr.length > 0) {
          setLists(true)
        }
        setIsLoading(false)
      })
    return () => databaseRef.off()
  }, [])
  return (
    <div className='home-container'>
      {
        isLoading ?
        <p>Preparando sua página Inicial...</p>
        :
          lists ?
          <Fragment>
            <h6>Olá! Bem-vindo de volta.</h6>
            <p>O que você gostaria de fazer?</p>
            <Button 
              tag={Link} to='/app/new-list' color="success">
                Criar nova lista <MdNewList id='home-new-list'/>
            </Button>
            <Button 
              tag={Link} to='/app/lists' color="primary">
              Gerenciar listas <MdCopy />
            </Button>
          </Fragment>
          :
          <Fragment>
            <h6>Olá! Seja bem-vindo...</h6>
            <p>Que tal criar uma nova lista, para começar?</p>
            <Button 
              tag={Link} to='/app/new-list' color="success">
                Criar nova lista <MdNewList id='home-new-list'/>
            </Button>
          </Fragment>
      }
    </div>
  )
}

export default Home
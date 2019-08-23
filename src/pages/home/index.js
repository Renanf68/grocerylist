import React from 'react'
import { Button } from 'reactstrap'
import { MdPlaylistAdd as MdNewList, MdContentCopy as MdCopy } from 'react-icons/md'
import { Link } from 'react-router-dom';

import './styles.css'

const Home = props => {
  return (
    <div className='home-container'>
      <h6>No momento, não há listas em aberto.</h6>
      <p>O que você gostaria de fazer?</p>
      <Button 
        tag={Link} to='/app/new-list' color="success">
          Criar nova lista <MdNewList id='home-new-list'/>
      </Button>
      <Button 
        tag={Link} to='/app/lists' color="primary">
        Copiar de uma lista existente <MdCopy />
      </Button>
    </div>
  )
}

export default Home
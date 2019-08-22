import React from 'react'
import { Button } from 'reactstrap'
import { MdPlaylistAdd as NewList, MdContentCopy as Copy } from 'react-icons/md'
import { Link } from 'react-router-dom';

import './styles.css'

const Home = props => {
  return (
    <div className='home-container'>
      <h6>No momento, não há listas em aberto.</h6>
      <p>O que você gostaria de fazer?</p>
      <Button color="success">Criar nova lista <NewList id='home-new-list'/></Button>
      <Button color="primary">Copiar de uma lista existente <Copy /></Button>
    </div>
  )
}

export default Home
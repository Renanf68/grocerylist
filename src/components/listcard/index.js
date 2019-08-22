import React, { useReducer } from 'react'
import { Col, Row } from 'reactstrap'
import { MdPlaylistAdd } from 'react-icons/md'
import ListTable from './ListTable'

import './styles.css'

const ListCard = props => {
  //const [state, dispatch] = useReducer(listCardReducer, initialState);
  const dataEm = []
  const data = [
    {
      product: 'Feijão Macassa',
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
  return (
    <div className='list-card'>
      <Row>
        <Col xs={6} className='list-header-title'>
          <h4>ListCard</h4>
        </Col>
        <Col xs={6} className='list-header-btn'>
          <button
            title='Adicionar item' 
            className='btn btn-success'>
            Add Item <MdPlaylistAdd />
          </button>
        </Col>
      </Row>
      <h6>Alimentação</h6>
      <ListTable 
        isLoading={false}
        products={data}  
      />
      <h6>Higiene</h6>
      <ListTable 
        isLoading={false}
        products={data}  
      />
      <h6>Limpeza</h6>
      <ListTable 
        isLoading={false}
        products={data}  
      />
      <Row>
        <Col xs={12} className='list-card-total'>
          <h6>Total Geral: R$ 100,00</h6>
        </Col>
      </Row>
    </div>
  )
}

export default ListCard
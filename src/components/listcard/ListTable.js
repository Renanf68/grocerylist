import React, { useState, useEffect } from 'react'
import { Table, Spinner } from 'reactstrap'
import { convertMathToBRL } from '../../utils'
import ListTableItem from './ListTableItem'

const ListTable = props => {
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const newTotal = props.products.map(p => p.ptotal.num).reduce((n1, n2) => n1 + n2, 0)
    const totalStr = convertMathToBRL(newTotal)
    setTotal(totalStr)
  }, [props.products])
  return (
    <Table responsive size='sm' className='list-table'>
            <thead>
                <tr>
                    <th title='Nome do produto'>Produto</th>
                    <th title='Quantidade'>Qtd.</th>
                    <th title='Preço unitário'>Preço unitário</th>
                    <th title='Preço total'>Preço total</th>
                    <th className='list-table-actions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {   
                    props.isLoading ?
                        <tr>
                            <td 
                                colSpan='10'
                                style={{
                                    padding: '18px',
                                    fontSize: '16px',
                                    color: 'darkgrey'
                                }}
                            >Carregando 
                            <Spinner type='grow' color='secondary' />
                            <Spinner type='grow' color='secondary' />
                            <Spinner type='grow' color='secondary' />
                            </td>
                        </tr> 
                    :
                        props.products.length > 0 ?
                            props.products.map( (item, i) => (
                                <ListTableItem 
                                    item={item} 
                                    key={i}
                                    remove={props.remove}
                                    editing={props.editing}
                                    itemCheck={props.itemCheck}
                                />
                                )
                        )
                        :
                        <tr>
                            <td 
                                colSpan='10'
                                className='empty-list-message'
                            >Esta lista está vazia.</td>
                        </tr> 
                }
                <tr style={{fontWeight: 'bold'}}>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>{total}</td>
                    <td></td>
                </tr>
            </tbody>
        </Table>
  )
}

export default ListTable
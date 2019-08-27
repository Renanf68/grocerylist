import React from 'react'
import { Table } from 'reactstrap'

const ListTable = props => {
  return (
    <Table responsive size='sm' className='list-table'>
            <thead>
                <tr>
                    <th title='Apelido da lista'>Apelido</th>
                    <th title='Data de conclusão'>Data</th>
                    <th title='Local onde as compras foram realizadas'>Mercado</th>
                    <th title='Valor total'>Total</th>
                    <th title='Status da lista'>Status</th>
                    <th title='Ações disponíveis'>Ações</th>
                </tr>
            </thead>
            <tbody>
                { props.children }
            </tbody>
        </Table>
  )
}

export default ListTable
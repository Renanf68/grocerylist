import React from 'react'
//import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEye, FaTrashAlt, FaRegCopy } from 'react-icons/fa'
import { dateFormat } from '../../utils'

const ListsTableItem = props => {
    const { id, alias, date, market, total, status, items } = props.list
    let newStatus = 'Concluída'
    if(status === 'open') {
      newStatus = 'Aberta'
    }
    return (
        <tr key={id}>
            <td><strong>{alias}</strong></td>
            <td>{dateFormat(date)}</td>
            <td>{market}</td>
            <td><strong>{total}</strong></td>
            <td>{newStatus}</td>
            <td>
              <button 
                onClick={() => props.viewList(id, items)}
                className="btn btn-success list-item-btns"
                title="Visualizar lista"
              >
                <FaEye />
              </button>
              <button 
                onClick={() => props.copyList(id, items)}
                className="btn btn-info list-item-btns"
                title="Criar cópia"
              >
                <FaRegCopy />
              </button>
              <button 
                onClick={() => props.removeList(id)}
                className="btn btn-danger list-item-btns"
                title="Excluir lista"
              >
                <FaTrashAlt />
              </button>
            </td>
        </tr>
    )
}

export default ListsTableItem
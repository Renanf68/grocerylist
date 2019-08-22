import React from 'react'
//import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const ListTableItem = props => {
    const { id, product, qtd, puni, ptotal } = props.item
    return (
        <tr key={id}>
            <td>
              <button 
                className="btn btn-warning list-item-btn-edit"
                onClick={() => props.edit(id)}
              >
                {product} <FaEdit />
              </button>
            </td>
            <td>{qtd}</td>
            <td>{puni.str}</td>
            <td>{ptotal.str}</td>
            <td>
              <button 
                  onClick={() => props.remove(id)}
                  className="btn btn-danger list-item-btns"
                  title="Excluir Simulação"
                >
                  <FaTrashAlt />
              </button>
            </td>
        </tr>
    )
}

export default ListTableItem
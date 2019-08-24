import React from 'react'
//import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

const ListTableItem = props => {
    const { id, product, category, qtd, punit, ptotal } = props.item
    return (
        <tr key={id}>
            <td>
              <button 
                className="btn btn-warning list-item-btn-edit"
                onClick={() => props.editing(props.item)}
              >
                {product} <FaEdit />
              </button>
            </td>
            <td>{qtd}</td>
            <td>{punit.str}</td>
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
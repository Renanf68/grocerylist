import React from 'react'
//import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEdit, FaTrashAlt, FaCheck, FaUndo } from 'react-icons/fa'

const ListTableItem = props => {
    const { id, product, qtd, punit, ptotal, check } = props.item
    return (
        <tr key={id}>
            {
              check ?
              <td>{product}</td>
              :
              <td>
                <button 
                  className="btn btn-warning list-item-btn-edit"
                  onClick={() => props.editing(props.item)}
                >
                  {product} <FaEdit />
                </button>
              </td>
            }
            <td>{qtd}</td>
            <td>{punit.str}</td>
            <td>{ptotal.str}</td>
            <td>
              {
                !check && (
                  <button 
                    onClick={() => props.remove(id)}
                    className="btn btn-danger list-item-btns"
                    title="Excluir item"
                  >
                    <FaTrashAlt />
                </button>
                )
              }
              {
                check ? 
                <button 
                  onClick={() => props.itemCheck(props.item)}
                  className="btn btn-warning list-item-btns"
                  title="Desfazer coleta"
                >
                  <FaUndo />
                </button>
                :
                <button 
                  onClick={() => props.itemCheck(props.item)}
                  className="btn btn-success list-item-btns"
                  title="Item coletado"
                >
                  <FaCheck />
                </button>
              }
            </td>
        </tr>
    )
}

export default ListTableItem
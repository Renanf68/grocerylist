import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  FaEdit,
  FaTrashAlt,
  FaCheck,
  FaUndo,
  FaEllipsisV,
} from "react-icons/fa";

const ListTableItem = (props) => {
  const ref = useRef();
  const { id, category, product, qtd, punit, ptotal, check } = props.item;
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "ITEM", index: props.index, id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: "ITEM",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = props.index;
      if (draggedIndex === targetIndex) {
        return;
      }
      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (
        draggedIndex < targetIndex &&
        draggedTop < targetCenter &&
        targetIndex - draggedIndex === 1
      ) {
        return;
      }
      if (
        draggedIndex > targetIndex &&
        draggedTop > targetCenter &&
        draggedIndex - targetIndex === 1
      ) {
        return;
      }
      /*Pegar o objeto inteiro dos itens "arrastado" e "alvo" pra checar se 
      fazem parte da mesma lista (food, hygiene e etc). 
      Criar um campo "index" para cada item no database, rodar um ".orderBy("index"),
      no load do database e criar função para alterar o index do arrastado - para a 
      posição de drop - e deslocar os outros itens da mesma lista (food, por exp),
      que estiverem abaixo, um index abaixo.
      ou checar se tem como fazer a alteração de index direto no database*/
      console.log("teste", draggedIndex - targetIndex);
    },
  });
  dragRef(dropRef(ref));
  return (
    <tr key={id} ref={ref} className={isDragging ? "is-dragging" : null}>
      <td className="grab-item">
        <FaEllipsisV />
      </td>
      {check ? (
        <td className="list-card-prodct-name">{product}</td>
      ) : (
        <td className="list-card-prodct-name">
          <button
            className="btn btn-warning list-item-btn-edit"
            onClick={() => props.editing(props.item)}
          >
            {product} <FaEdit />
          </button>
        </td>
      )}
      <td>{qtd}</td>
      <td>{punit.str}</td>
      <td>{ptotal.str}</td>
      <td>
        {!check && (
          <button
            onClick={() => props.remove(id, category, product)}
            className="btn btn-danger list-item-btns"
            title="Excluir item"
          >
            <FaTrashAlt />
          </button>
        )}
        {check ? (
          <button
            onClick={() => props.itemCheck(props.item)}
            className="btn btn-warning list-item-btns"
            title="Desfazer coleta"
          >
            <FaUndo />
          </button>
        ) : (
          <button
            onClick={() => props.itemCheck(props.item)}
            className="btn btn-success list-item-btns"
            title="Item coletado"
          >
            <FaCheck />
          </button>
        )}
      </td>
    </tr>
  );
};

export default ListTableItem;

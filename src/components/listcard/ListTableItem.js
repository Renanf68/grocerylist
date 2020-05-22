import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FaEdit, FaTrashAlt, FaCheck, FaUndo } from "react-icons/fa";

const ListTableItem = (props) => {
  const ref = useRef();
  const { id, category, product, qtd, punit, ptotal, check } = props.item;
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: "ITEM", index: props.index, id, category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, dropRef] = useDrop({
    accept: "ITEM",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const draggedCat = item.category;
      const targetIndex = props.index;
      const targetCat = category;
      if (draggedIndex === targetIndex) {
        return;
      }
      if (draggedCat !== targetCat) {
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
      props.changeItemPosition(draggedCat, draggedIndex, targetIndex);
      item.index = targetIndex;
    },
  });
  dragRef(dropRef(ref));
  return (
    <tr key={id} ref={ref} className={isDragging ? "is-dragging" : null}>
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

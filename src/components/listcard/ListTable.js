import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { convertMathToBRL, getArrSortByIdx } from "../../utils";
import ListTableItem from "./ListTableItem";

const ListTable = (props) => {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const products = getArrSortByIdx(props.products);
    const newTotal = props.products
      .map((p) => p.ptotal.num)
      .reduce((n1, n2) => n1 + n2, 0);
    const totalStr = convertMathToBRL(newTotal);
    setList(products);
    setTotal(totalStr);
  }, [props.products]);
  return (
    <Table responsive size="sm" className="list-table list-card">
      <thead>
        <tr>
          <th title="arastar"></th>
          <th title="Nome do produto">Produto</th>
          <th title="Quantidade">Qtd.</th>
          <th title="Preço unitário">Preço unitário</th>
          <th title="Preço total">Preço total</th>
          <th className="list-table-actions">Ações</th>
        </tr>
      </thead>
      <tbody>
        {list.length > 0 ? (
          list.map((item, i) => (
            <ListTableItem
              item={item}
              key={i}
              index={i}
              remove={props.remove}
              editing={props.editing}
              itemCheck={props.itemCheck}
              changeItemPosition={props.changeItemPosition}
            />
          ))
        ) : (
          <tr>
            <td colSpan="10" className="empty-list-message">
              Esta lista está vazia.
            </td>
          </tr>
        )}
        <tr style={{ fontWeight: "bold" }}>
          <td>Total</td>
          <td></td>
          <td></td>
          <td>{total}</td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListTable;

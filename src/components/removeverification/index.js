import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";

const RemoveVerification = (props) => {
  let text = "";
  if (props.type === "list") {
    text = "da lista";
  } else {
    text = "do item";
  }
  return (
    <Modal
      isOpen={props.show}
      toggle={props.toggle}
      className="component-wraped"
    >
      <ModalHeader toggle={props.toggle}>
        <FaTrashAlt />
      </ModalHeader>
      <ModalBody>
        Confirmar exclusão {text}: <strong>"{props.name}"</strong>?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={props.cancel}>
          Cancelar
        </Button>
        <Button
          color="danger"
          onClick={() => props.remove(props.id, props.category)}
        >
          Excluir
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RemoveVerification;

import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MdExitToApp } from 'react-icons/md'

const LogoutVerification = props => {
  return (
    <Modal isOpen={props.show} toggle={props.toggle} className="component-wraped">
      <ModalHeader toggle={props.toggle}><MdExitToApp /></ModalHeader>
      <ModalBody>
        Você deseja sair da sua conta (logout)?
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={props.cancel}>Cancelar</Button>
        <Button color="danger" onClick={props.logout}>Confirmar</Button>
      </ModalFooter>
    </Modal>
  )
}

export default LogoutVerification
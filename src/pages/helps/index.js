import React from 'react'
import { Row, Col } from 'reactstrap'
import { FaShoppingBag, FaEye, FaRegCopy, FaEdit, FaCheck, FaUndo } from 'react-icons/fa'
import { MdExitToApp, MdHelp, MdPlaylistAdd, MdPlaylistAddCheck, MdLockOutline } from 'react-icons/md' 

import './styles.css'

const Helps = props => {
  return (
    <div className="helps">
      <h6>Navegação principal:</h6>
      <Row className="help">
        <Col xs={1}>
          <FaShoppingBag />
        </Col>
        <Col xs={11}>
          <p>Voltar à página inicial.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
          <MdExitToApp />
        </Col>
        <Col xs={11}>
          <p>Sair do app.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
          <MdHelp />
        </Col>
        <Col xs={11}>
          <p>Página de ajuda.</p>
        </Col>
      </Row>
      <h6>Gerenciar listas:</h6>
      <Row className="help">
        <Col xs={1}>
          <FaEye />
        </Col>
        <Col xs={11}>
          <p>O botão de visualização permite rever as listas que já foram criadas: abertas e encerradas.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
          <FaRegCopy />
        </Col>
        <Col xs={11}>
          <p>Este botão premite copiar todos os items cadastrados em uma lista, para uma nova lista a ser criada.</p>
        </Col>
      </Row>
      <h6>Listas:</h6>
      <Row className="help">
        <Col xs={1}>
          <MdPlaylistAdd />
        </Col>
        <Col xs={11}>
          <p>Adicionar novo item à lista.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
         <FaEdit />
        </Col>
        <Col xs={11}>
          <p>Editar as informações sobre o produto.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
         <FaCheck />
        </Col>
        <Col xs={11}>
          <p>Informar que o produto foi coletado, durante a realização das compras.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
         <FaUndo />
        </Col>
        <Col xs={11}>
          <p>Desfazer marcação do produto como coletado.</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
         <MdLockOutline />
        </Col>
        <Col xs={11}>
          <p>Após a realização das compras, este botão faz o encerramento da lista.</p>
        </Col>
      </Row>
      <h6>Criar novo item:</h6>
      <Row className="help">
        <Col xs={12}>
          <p>Ao clicar no botão <MdPlaylistAdd />, é possível criar um novo item para a lista contendo, pelo menos, <strong>nome, categoria e quantidade</strong>. Durante a realização das compras, é possível editar <FaEdit /> o produto e inserir o preço unitário do mesmo.</p>
        </Col>
      </Row>
    </div>
  )
}
export default Helps
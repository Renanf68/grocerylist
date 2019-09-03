import React from 'react'
import { Row, Col } from 'reactstrap'
import { FaEye, FaRegCopy, FaEdit, FaCheck, FaUndo } from 'react-icons/fa'
import { MdExitToApp, MdHelp, MdPlaylistAdd, MdLockOutline } from 'react-icons/md'
import Logo from '../../images/logo-orange.png' 

import './styles.css'

const Helps = props => {
  return (
    <div className="helps">
      <h6>Navegação principal:</h6>
      <Row className="help">
        <Col xs={1}>
          <img src={Logo} alt="GroceryList" id='helps-logo'/>
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
          <p>Este botão permite visualizar as listas que já foram criadas (estando abertas ou encerradas).</p>
        </Col>
      </Row>
      <Row className="help">
        <Col xs={1}>
          <FaRegCopy />
        </Col>
        <Col xs={11}>
          <p>Este botão premite copiar todos os itens cadastrados em uma lista, para uma nova lista a ser criada.</p>
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
          <p>Ao clicar no botão "Item <MdPlaylistAdd />", é possível criar um novo item para a lista. O mesmo deve conter, pelo menos, <strong>nome</strong>, <strong>categoria</strong> e <strong>quantidade</strong>. Durante a realização das compras, é possível editar ("<FaEdit />") o produto e inserir o seu preço unitário, por exemplo, verificado na prateleira do estabelecimento.</p>
        </Col>
      </Row>
    </div>
  )
}
export default Helps
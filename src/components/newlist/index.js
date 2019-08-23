import React from 'react'
import NewListForm from './NewListForm'

const NewList = ({ history }) => {
  function historyPush(id) {
    //setar o id
    return history.push('/app/open-list/:id')
  }
  return (
    <div className="component-wraped">
      <h4>Nova lista</h4>
      <NewListForm historyPush={historyPush}/>
    </div>
  )
}

export default NewList
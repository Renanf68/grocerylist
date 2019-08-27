import React from 'react'
import { Alert } from 'reactstrap'
import { MdErrorOutline, MdCheckCircle } from 'react-icons/md'

const CustonAlert = props => {
  const svgStyle = {marginBottom: '2px'}
  return (
    <Alert color={props.type}>
      { props.type === 'success' && <MdCheckCircle style={svgStyle}/>} 
      { props.type === 'warning' && <MdErrorOutline style={svgStyle}/>}
      {' '}{props.children} 
    </Alert>
  )
}
export default CustonAlert
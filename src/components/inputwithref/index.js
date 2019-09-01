import React, { useRef, useImperativeHandle, forwardRef } from 'react'

const InputWithRef = forwardRef( (props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return (
    <input 
      ref={inputRef}
      className='form-control'
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange} 
    />
  );
})
export default InputWithRef;
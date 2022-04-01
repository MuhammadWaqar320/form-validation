import React from 'react'
import './inputField.scss'
const Input = ({type,placeholder,value,label,id,onchange,title,regex,minLength,maxLength}) => {
  return (
    <>
    <label className='label'>{label}:</label><br></br>
    {/* <input type={type} value={value} pattern={regex} minLength={minLength} maxLength={maxLength} placeholder={placeholder} title={title} onChange={onchange} className='input-field' required></input> */}
    <input type={type} value={value} id={id}  placeholder={placeholder} title={title} onChange={onchange} className='input-field'></input>
    
    </>
  )
}

export default Input
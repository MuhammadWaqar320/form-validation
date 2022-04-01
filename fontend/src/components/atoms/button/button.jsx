import React from 'react'
import './button.scss'
const Buttons = ({label,type,Class,id}) => {
  return (
    <div>
        <button type={type} className={Class} id={id} >{label}</button>
    </div>
  )
}
Buttons.defaultProps={
  className:'btn'
}
export default Buttons
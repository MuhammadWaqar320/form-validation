import React from 'react'
import './button.scss'
const Buttons = ({label,type,Class,icon}) => {
  return (
    <div>
        <button type={type} className={Class} >{label}</button>
    </div>
  )
}
Buttons.defaultProps={
  className:'btn'
}
export default Buttons
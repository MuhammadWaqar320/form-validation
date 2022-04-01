import React from 'react';
const Image_component = ({source,Class,Alt}) => {
  return (
    <img src={source} className={Class} alt={Alt}></img>
  )
}
export default Image_component
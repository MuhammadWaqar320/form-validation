import React from 'react'
import { useState } from 'react'
import './form.scss';
import FormComponent from '../../molecules/FormComponent/formComponent';
const Form = () => {
  return (
  <div className='main-form-class'>
      <div className='formLeft'>
        
      </div>
      
      <div className='formCenter'>
          <FormComponent/>
      </div>
      
      <div className='formRight'>
      </div>    
  </div>
  )
}

export default Form
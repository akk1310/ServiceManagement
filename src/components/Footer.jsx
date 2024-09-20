import React from 'react'
import './Footer.css';

const Footer = () => {
    const  year=new Date().getFullYear()
  return (
    <div className='ft'>
        <div>&copy;{year}, </div>
      Developed by 
      <a target='_blank' href="https://github.com/akk1310"> @AdnanKundlik</a>
    </div>
  )
}

export default Footer

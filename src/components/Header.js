import React from 'react'
import './../styles/Header.css'
const Header = () => {
  return (
    <div className='header'>
        <img src='./AULogo.png' alt='aulogo' height="50px" width="50px" className='logo' />
        <div>
           <h3 className='headerh3'> Department of Information Science and Technology - CO PO Attainment</h3>
           <h5 className='headerh5'>Anna University, Chennai - 600025</h5> 
        </div>
        <img src='./CEGLogo.png' alt='ceglogo' height="50px" width="50px" className='logo'/>
    </div>
  )
}

export default Header
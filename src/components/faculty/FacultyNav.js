import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink, useNavigate } from 'react-router-dom'
const FacultyNav = () => {
  const navigate = useNavigate()
  
  const handleLogout = () => {
   
    console.log('hhihi')
    // localStorage.setItem('adminId',id);
    localStorage.setItem('isFacLoggedIn',"false")
    navigate('/')
    
      }
  return (
    <>
    <div className='navbar'>
    <p id="adminname" className='leftalign'>
      <div className='contain'>
    <FontAwesomeIcon icon={faUser} id="facultyprofile" />
    <button className='logout' onClick={handleLogout}>Logout</button>
   
    </div>
      Faculty</p>
      <div className='dropdown'>
      <ul className='links'>
      <li ><NavLink to='/facultyhome' className='tabs' exact>Home</NavLink></li>
          <li ><NavLink to='/mycourses' className='tabs' exact>My Courses</NavLink></li>
        <li ><NavLink to='/generateqp' className='tabs' exact>Question Paper</NavLink></li>
        <li ><NavLink to='/inputmarks' className='tabs' exact>Input Marks</NavLink></li>
        <li><NavLink to='/po' className='tabs' exact>PO</NavLink></li>
        <li><NavLink to='/coanalytics' className='tabs' exact>CO Analytics</NavLink></li>
        
          </ul>
    </div>
    </div>
    </>
  )
}

export default FacultyNav
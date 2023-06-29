import React, { useState } from 'react'
import '../../styles/admin/SideNavbar.css'
import { NavLink , useNavigate} from 'react-router-dom'
import Header from '../Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


const SideNavbar = () => {
  const navigate = useNavigate()
  
  const [showlogout,setLogout] = useState(true)
  const handleLogout = () => {
console.log('hhihi')
// localStorage.setItem('adminId',id);
      localStorage.setItem('isAdminLoggedIn',"false")
      navigate('/')

  }
  return (
    <>
    
    <div className='navbar'>
    <p id="adminname" className='leftalign'>
      <div className='contain'>
    <FontAwesomeIcon icon={faUser} id="adminprofile" />
    {/* <div className='logout'> */}

      <button className='logout' onClick={handleLogout}>Logout</button>
    {/* </div> */}
    </div>
    
      Admin</p>
    <div className="dropdown">
    <NavLink to = '/adminhome' exact className='adhome'>Home</NavLink>
    
    <div className="dropbtn">
      
      <p className='tabssidenav'>Student Section </p>
    <div className="dropdown-content">
    
    <NavLink to = '/addbatch' exact >Add New Batch</NavLink>
    <NavLink to = '/viewbatches' exact >View Batches</NavLink>
    </div>
    </div>

    
    <div className="dropbtn">
      <p className='tabssidenav'>Faculty Section </p>
    <div className="dropdown-content">
    <NavLink to = '/addfaculty' exact >Add New Faculty</NavLink>
              <NavLink to = '/viewfaculties' exact >View Faculties</NavLink>
    </div>
</div>
        
        
    <div className='dropbtn'>
      <p className='tabssidenav'>Courses Section</p>
          <div className="dropdown-content" >
            <NavLink to = '/courseallocation' exact >Course Allocation</NavLink>
            <NavLink to = '/updatecc' exact >Course Curriculum</NavLink>
   </div>
   </div>
 
  </div>
        
    </div>
    
        
      
    
    </>
  )
}

export default SideNavbar
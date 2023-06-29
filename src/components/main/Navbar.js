import React,{useState} from 'react'
import '../../styles/main/Navbar.css'
import { NavLink } from 'react-router-dom'
// import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  return (
    <React.Fragment>
       <header>
        <div className='navbar'>
          <ul className='links'>
          <li ><NavLink to='/' className='tabs' exact>Home</NavLink></li>
        <li ><NavLink to='/nba' className='tabs' exact>CO-PO</NavLink></li>
        {/* <li ><NavLink to='/coursecurriculum' className='tabs' exact>Course Curriculum</NavLink></li> */}
        {/* <li ><NavLink to='/questionbank' className='tabs' exact>Questionbank</NavLink></li> */}
        
        {/* <li><NavLink to='/about' className='tabs' exact>About</NavLink></li> */}
       
          </ul>
          <NavLink to='/login' className='action-button' exact>Login</NavLink>
          <div className='navbar-toggle'>
    {/* <FontAwesomeIcon icon={faBars} style={{color: "#fff"}}  onClick={toggleNavbar} /> */}
</div>
        </div>
        
    {/* <div className='navbar'>

    <div className='navbar-toggle'>
    <FontAwesomeIcon icon={faBars} style={{color: "#fff"}}  onClick={toggleNavbar} />

          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
    </div>
  
    <ul className={isOpen ? 'navbar-nav active' : 'navbar-nav'}>
        <li className="nav-item"><NavLink to='/' className='tabs' exact>Home</NavLink></li>
        <li className="nav-item"><NavLink to='/nba' className='tabs' exact>NBA</NavLink></li>
        <li className="nav-item"><NavLink to='/about' className='tabs' exact>About</NavLink></li>
       </ul>
    <NavLink to='/login' className='action-button' exact>Login</NavLink>
    

    </div>
    */}
    </header>
    </React.Fragment>
  )
}

export default Navbar
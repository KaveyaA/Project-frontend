import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import FacultyNav from './FacultyNav'
import '../../styles/faculty/FacultyHome.css'
import axios from 'axios'
const FacultyHome = () => {
  const navigate = useNavigate()
  var isFacultyLoggedIn = localStorage.getItem('isFacLoggedIn');
  // var id = localStorage.getItem('facultyId')
 

  const[name, setName] = useState()
  useEffect(() => {
    if(isFacultyLoggedIn == "false")
        navigate('/login')
    console.log(localStorage.getItem('facultyId'))
    axios.post('http://localhost:5000/facname',
    {
      facultyId: localStorage.getItem('facultyId')
    }
    ).then(
      res => setName(res.data.facultyName)
    )
  },[isFacultyLoggedIn])

// useEffect(() => {
//     await axios.post('http://localhost:5000/facname',
//     {
//       facultyId: localStorage.getItem('facultyId')
//     }
//     ).then(
//       res => setName(res.data.facultyName)
//     )
// })
const handleLogout = () =>{
  localStorage.setItem('isFacLoggedIn',"false");
  navigate('/login')
}
  return (
    <>
      <FacultyNav/>
      <div className='mainhomefac'>
    <div className='homepagefac'>
      {/* <h1>helloo</h1> */}
    </div>
    <div className='right'>
   <div className='rightcontent'>
    <h1>Welcome back !
      
     </h1>
     <h2> {name}</h2>
   </div>
    </div>
   </div>
    </>
  )
}

export default FacultyHome


import React, { useState } from 'react'
import Sidenavbar from './SideNavbar'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin/AddFaculty.css'
import { ToastContainer, toast } from 'react-toastify';

const AddFaculty = () => {
 const navigate = useNavigate()

  const[name, setName] = useState('')
  const[id, setId] = useState('')
  const[designation, setDesignation] = useState('')
  
  const addFac = (e) =>{
    e.preventDefault()
    if(id=="")
        {
          toast.error("Please,enter your ID",{position: "top-center",autoClose:3000})  
        }
    else if(name=="")
    {
      toast.error("Please,enter your name",{position: "top-center",autoClose:3000})
    }
    else if(designation == ""){
      toast.error("Please,Choose designation",{position: "top-center",autoClose:3000})  
       
    }else{
  axios.post('http://localhost:5000/setFaculty',{
      facultyId : id,
      facultyName : name,
      facultyDesignation : designation
    }).then((res) => {
      if(res.status === 400)
      {
        toast.warning("Faculty is already registered",{position: "top-center",autoClose:3000})
      }
     else{
        toast.success("Saved successfully",{position: "top-center",autoClose:3000})
        // alert(res.data)
      }
    })
       setId('')
       setName('')
       setDesignation('')
      
    
  }
  }
  return (
    <React.Fragment>
      <Sidenavbar/>
      <div className='addfacbody'>
        <p id="addfacultyheading">Add New Faculty</p>
        <div className='adminBox'>
          <div className='fieldset'>
          <h3>Enter Faculty Details </h3>
        
          <input type='text' placeholder='Enter faculty id'
           onChange={(e) => setId(e.target.value) } value={id}
          /><br></br>
           <input type='text' placeholder='Enter faculty name'
          onChange={(e) => setName(e.target.value)} value={name}
          /><br></br>
           {/* <input type='text' placeholder='Enter designation'
           onChange={(e) => setDesignation(e.target.value) } value={designation}
          /><br></br> */}
          <p id="selectdes">Select Designation</p>
          <select className='select' onChange={(e) => setDesignation(e.target.value)} value={designation}>
            <option></option>
            <option>Professor</option>
            <option>Assistant Professor</option>
            <option>Associate Professor</option>

          </select><br></br>


          <button onClick={addFac} className='button'>Add Faculty</button>
          <button onClick={() => {navigate('/adminhome')}} className='cancelbutton'>Cancel</button>
          <br></br>
          <NavLink to = '/viewfaculties' exact >View Faculties</NavLink>
   
          {/* <button onClick={() => {navigate('/viewfaculties')}} className='button'>View Faculties</button> */}
        </div>
        </div>
      </div>
      
      <ToastContainer />
    </React.Fragment>
    
  )
}

export default AddFaculty
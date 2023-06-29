import React, { useEffect, useState } from 'react'
import Sidenavbar from './SideNavbar'
import axios from 'axios'
import '../../styles/admin/ViewFaculties.css'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import Popup from 'reactjs-popup';

const URL="http://localhost:5000/getFaculty";
const fetchHandler=async()=>{
    return await axios.get(URL).then((res)=>res.data)
}

const ViewFaculties = () => {
  const[facultyList, setFacultyList] = useState([])
  const[showPopUp, setShowPopUp] = useState(false)
 
  const[facultyNameToBeEdited, setFacultyNameToBeEdited] = useState('')
  const[facultyDesignationToBeEdited, setFacultyDesignationToBeEdited] = useState('')

  

  const[id, setId] = useState('')
  
  useEffect(() => {
    console.log('hi')
     fetchHandler().then(data => setFacultyList(data.facultyDetailsObj))
  
  },[facultyList])
  // console.log(faculty)

  const handleDelete = ({faculty}) => {
    console.log(faculty.facultyId)
      axios.delete('http://localhost:5000/deletefaculty',{
       data:{ facultyId : faculty.facultyId}
      })
      .then(() => {
        toast.success("Deleted successfully",{position: "top-center",autoClose:3000})
        // alert('deleted successfully')
       })
   }
   const handleCancel= () => {
    setShowPopUp(false)
 }
 const handleEdit= ({faculty}) => {
  // console.log(id,'is clicked')
  console.log(faculty)
  
  setFacultyNameToBeEdited(faculty.facultyName)
  setFacultyDesignationToBeEdited(faculty.facultyDesignation)
  setId(faculty.facultyId)
  console.log(facultyNameToBeEdited)
  setShowPopUp(true)
   
}

 const handleSave = () => {
    axios.put('http://localhost:5000/updatefaculty',{
      facultyName : facultyNameToBeEdited,
      facultyDesignation : facultyDesignationToBeEdited,
      facultyId : id
    })
    .then( () => {
      // alert('Updated successfully')
      setShowPopUp(false)
      // axios.get('http://localhost:5000/getfaculty')
      // .then(res => setFacultyList(res.data.facultyDetailsObj))
      
    }
    )
 }
  return (
    <React.Fragment>
       <Sidenavbar/>
       <div className='viewfac'>
        <p id="facultyheading">List of Faculties</p>
        {
         showPopUp && <div className='editfacpopup'><h2>Update Faculty</h2>
        Name : <input type="text" value={facultyNameToBeEdited} onChange={(e) => setFacultyNameToBeEdited(e.target.value)}
        
         /><br></br>
        Designation: <input type="text" value={facultyDesignationToBeEdited} onChange={(e) => setFacultyDesignationToBeEdited(e.target.value)}/>
        <br></br>
        <button onClick={handleSave} className='button'>Save</button>
        <button onClick={handleCancel} className='cancelbutton'>Cancel</button>
         </div>
        }
        <div className=''>
          <table id="factable">
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th></th>
            <th></th>
         
          {facultyList.map((faculty,i) => {
            return(
            <tr key = {i}>
              <td value={faculty.facultyId}>{faculty.facultyId}</td>
              <td value={faculty.facultyName}>{faculty.facultyName}</td>
              <td value={faculty.facultyDesignation}>{faculty.facultyDesignation}</td>
              <td><FontAwesomeIcon icon={faPencil} style={{color : "#106470"}} onClick={()=> handleEdit({faculty})}/></td>
              <td><FontAwesomeIcon icon={faTrash} style={{color : "red"}} onClick={() => handleDelete({faculty})}/></td>
              
            </tr>)
})
          }
           </table>
        </div>
       </div>
       
        {/* fjdkjfkd */}
        {/* <Popup trigger=
                {<button> Click to open modal </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                Welcome to GFG!!!
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup> */}
       <ToastContainer />
    </React.Fragment>
  )
}

export default ViewFaculties
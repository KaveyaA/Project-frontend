import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SideNavbar from './SideNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import './../../styles/admin/Updatecc.css'

const UpdateCourseCurriculum = () => {
  const[courses,setCourses] = useState([])
  const[popup,setPopUp] = useState(false)
 
  const[pname,setpname]= useState('')
  const[pid,setpid]= useState('')
  const[cname,setcname]= useState('')
  const[cid,setcid]= useState('')
  const[sem,setsem]= useState('')
  
  useEffect(() => {
    axios.get('http://localhost:5000/getcoursecurriculum').then(res => setCourses(res.data.courseCurriculumObj));
    console.log(courses)
  //   fetchHandler().then(res =>console.log(res));
  // console.log(courses)
    },[]
  )

  const handleDelete = ({course}) => {
  //  console.log(course.courseName)
      axios.delete('http://localhost:5000/deletecoursecurriculum',{
     
      data:{ courseName: course.courseName}
      })
      .then((res) => {
        toast.success("Deleted successfully",{position: "top-center",autoClose:3000})
        axios.post('http://localhost:5000/getallcourses',{
          programmeName : "MCA"
      }).then(res => setCourses(res.data.courseCurriculumObj));
      
       })
   } 
   const handleadd = () =>{
        setPopUp(!popup)
   }
   const handleSave = () => {
    console.log(pname,pid,sem,cid,cname)
    axios.post('http://localhost:5000/setcoursecurriculum',{
        programmeName : pname,
        courseName: cname,
        courseId: cid,
        programmeId: pid,
        semesterType: sem
    }).then(res => {console.log(res.data)
      toast.success("Saved successfully",{position: "top-center",autoClose:3000})
    axios.post('http://localhost:5000/getallcourses',{
      programmeName : "MCA"
  }).then(res => setCourses(res.data));
  setcname('')
  setcid('')
  setpid('')
  setpname('')
  setsem('')
handleCancel()
}
    )

   }
   const handleCancel = () => {
      setPopUp(false)
   }
  return (
    <>
    <SideNavbar/>
    <p id="ccheading">Course Curriculum</p>
<div className={popup ? 'mybg':'bodyUpdatecc' }>
    <table className='updatetable'>
     <thead>
         <tr>
             <td><b><h3>MCA</h3></b></td>
             <td><b><h3>Course ID</h3></b></td>
             <td><b><h3>Semester</h3></b></td>
         </tr>
     </thead>
    <tbody>
      {
        courses.map((course,i) => (
          <tr key={i}>
            <td>{course.courseName}</td>
            <td>{course.courseId}</td>
            <td>{course.semesterType}</td>
            <td><FontAwesomeIcon icon={faTrash} style={{color : "red"}} onClick={() => handleDelete({course})}/></td>
          </tr>
        ))
      }
  </tbody>
  </table>
  <button onClick={handleadd} className='button'>Add</button>
  {
    popup && <>
    <div className='updatepopup'>
      <div className='popupboxdivupdate'>
        <p id="addccheading">Add Course</p>
    <label>Programme Name</label>
      <input type='text' onChange={(event) => setpname(event.target.value)} value={pname}/>
      <br></br>
      <label>Programme ID</label>
      <input type='text'  onChange={(event) => setpid(event.target.value)} value={pid}/>
      <br></br>
      <label>Semester</label>
    <select onChange={(event) => setsem(event.currentTarget.value)} value={sem} >
    <option></option>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
    </select>
    <br></br>
      <label>Course Name</label>
      <input type='text' onChange={(event) => setcname(event.target.value)} value={cname}/>
      <br></br>
      <label>Course ID</label>
      <input type='text' onChange={(event) => setcid(event.target.value)} value={cid}/>
      <br></br>
<div>
<button onClick={handleSave} className='button'>Save</button>
        <button onClick={handleCancel} className='cancelbutton'>Cancel</button>
         
</div>
      </div>
     
    </div>
    </>
  }
  </div>
  <ToastContainer />
    </>
  )
}


  

export default UpdateCourseCurriculum
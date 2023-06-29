import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/faculty/FacultyCourses.css'
import { Link } from 'react-router-dom'
import FacultyNav from './FacultyNav'
import { useNavigate } from 'react-router-dom'
import ViewBatchPerformance from './ViewBatchPerformance'

const FacultyCourses = () => {
  const navigate = useNavigate()
  const facultyId = localStorage.getItem("facultyId")
  const[myCourses, setMyCourses] = useState([])
  
  useEffect(() => {
    axios.post('http://localhost:5000/facultycourses',{
      facultyId : facultyId
    }).then(res => setMyCourses(res.data))
  },[facultyId])
  console.log(myCourses)
  const handleView = () => {
    
    <ViewBatchPerformance value={10}/>
    navigate('/performance');
  }
  var testvalue = "abc"
  const newTo ={
    pathname : `/performance/${testvalue}`,
   // state:{ param1:"abcd"},
    

   };
  
  
  return (
    <>
    <FacultyNav/>
      <p id="facultyheading">My Courses</p>
      
    <div className='faccourses'>
    
      {
        myCourses.map((course,i) => {
          return(
           
          <div className='faccoursecard' key={i}>
             
              {/* var b = "";
            b={course.batch}+{course.courseName}
            console.log(b) */}
            {course.batch}
            <div className='faccname'>
            {course.courseName}
            <Link onClick={handleView} to={newTo} state={{batchidcidatype : course.batch+course.courseName }} className='view' >View</Link>
            
            </div>
           
           
            
          </div>
          )
        })
      }
    </div>
    </>
  )
}

export default FacultyCourses
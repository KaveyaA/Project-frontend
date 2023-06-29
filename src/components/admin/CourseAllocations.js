import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import '../../styles/admin/CourseAllocation.css'

function CourseAllocations() {
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    setShowDiv(!showDiv);
  };

  const[batch, setBatch] = useState([])
  const [select, setSelected]  = useState('');
  const[selectedfac,setselectedfac] = useState('')
  const [faculty, setFaculty] = useState('fa')
  const[facList, setFacList] = useState([])
  const[selCourse, setselcourse]= useState('')
  const[coulist,setcoulist] = useState([])
  const[sem,setsem] = useState(1)
  const[p,setP] = useState()
  const[facid,setFacId] =useState([])

let programme = "MCA"
var a = ""
  // const[showDiv, setShowDiv] = useState(false)
const navigate= useNavigate()

  const fetchCourses = () =>{
    return axios.post('http://localhost:5000/getcourses',{programmeName : programme,semesterType : sem})
  }
const fetchBatches = () => {
  return axios.get('http://localhost:5000/batcheslist')

}
const fetchFacultynamesAndId = () => {
  return axios.get('http://localhost:5000/getfacultynamesid')
}


  useEffect(() => {
    
    fetchBatches().then(res=>setBatch(res.data.collections))
   
   fetchFacultynamesAndId().then(res => setFacList(res.data))
   fetchCourses().then(res => setcoulist(res.data))
 
  
  },[sem])

const handleLogout=() => {
  localStorage.setItem('isLoggedIn', 'false')
  navigate('/')
  console.log(localStorage.getItem('isLoggedIn'))
}

const handleNext = () => {
  setShowDiv(true)
}
const handleAllocate = () => {
  axios.post('http://localhost:5000/allocatecourses',{
    batch : select,facultyId : selectedfac,courseName : selCourse
  }).then((res) =>{
    alert(res.data)
  })
  console.log('batch-',select,'course-',selCourse,'fac-',selectedfac)
}
const handleCancel = () => {
  
}
  return (
    <>
    <SideNavbar/> 
      <div className='cadiv'>
        <p id="caheading">Courses Allocation</p>
         <div className='allocatecourses'>
          <div className='labelinput'>
         <label>Programme Name:</label> 
          <select
            disabled={false}
            value={p}
            onChange={(e) => setP(e.currentTarget.value)}>
               <option></option>
                <option>MCA</option>
                <option>BTech</option>
        </select>
        </div>
        <div className='labelinput'>
       <label> Batch:</label>
    
           <select
            disabled={false}
            value={select}
            onChange={(e) => setSelected(e.currentTarget.value)}>
               <option></option>
            {batch.map((item,i) => (
            <option key={i} value={item}>
                {item}
            </option>
            ))}
        </select>
        </div>
        <div className='labelinput'>
       <label> Semester:</label>
       <select value={sem} onChange={(e) => setsem(e.target.value)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>

       </select>
       </div>
        </div>
        <button onClick={handleNext} className='button'>Next</button>
{showDiv &&
       <div className='allocatecourses'>  
       <div className='labelinput'>
        <label >Select Faculty:</label>

        <select className='choose'  disabled={false}
            value={selectedfac}
            onChange={(e) => setselectedfac(e.currentTarget.value)}>
              <option></option>
          {
            facList.map((f,i) => {
              return (
              //  console.log(f.facultyName)
               <option key={i} value={f.facultyId}>

              {f.facultyName}
               </option>)
      })
          }
        </select>
        </div>
        <br></br>
          <div className='labelinput'>
         <label >Choose course:</label>

        <select className='' onChange={(e) => setselcourse(e.target.value)}>
          <option></option>
          {
            coulist.map((c,i) => {
              // console.log(c.courseName)
              return (
                 <option key={i} value={c.courseName}>{c.courseName}</option>
              )
            })
          }

         
        </select>
        </div>
        <button className='button' onClick={handleAllocate}>Allocate</button>
    


      </div>
      }
      {/* <button onClick={handleLogout}>Logout</button> */}
    <button className='cancelbutton' onClick={() => {navigate('/adminhome')}}>Cancel</button>
    </div>
      </>
      )
}

export default CourseAllocations

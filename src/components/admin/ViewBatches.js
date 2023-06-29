import React, { useEffect, useState } from 'react'
import SideNavbar from './SideNavbar'
import axios from 'axios'
import '../../styles/admin/ViewBatches.css'

const fetchHandler  = async() => {
  return await axios.get("http://localhost:5000/batcheslist").then((res) => res.data)
}
const ViewBatches = () => {
const[batchList, setBatchList] = useState([])
const[studentList,setStudentList] = useState([])

const[popup,setPopup] = useState(false)
  useEffect(() => {
    console.log('hi')
    fetchHandler().then(data => setBatchList(data.collections))
  },[])
  const handleCancel = () => {
    setPopup(false)
 }

  const handleView = async(batch) =>{
  console.log(batch)
  await axios.post('http://localhost:5000/getstudentlist',{
    batch:batch
  }).then(res=>setStudentList(res.data))
  setPopup((popup) => !popup)
  console.log(popup)
  }
  return (
    <div>
       <SideNavbar/>
    <div className='bodyviewbatch'>
      <p id="viewbatchheading">Batches of IST Department</p>
      <div className='batchcard'>
        {
          batchList.map((batch,i) => (
            // console.log(batch)
            <div key={i} className='bcard'>
              {batch}
              <button onClick={() => handleView(batch)} className='button'>View</button>
              </div>

          ))
        }
      </div>

    </div>
        {
          popup && <div className='popupboxupdatecc'>
              <button onClick={handleCancel} className='cancelbutton' id="closebutton">
                <b>x</b>
              </button>
      
            <div className='popupboxdiv'>
          <div className='popupboxcontent'>
              <table className='studentlisttable'>
                <thead>
                  <tr>
                    <td>
                      
                      <b>RollNo</b></td>
                    <td>
                      <b>Name</b>
                    </td>
                  </tr>
                </thead>

                <tbody>
                {
                  // console.log(studentList[0].RollNo)
                  studentList.map((student,i) => (
                    <tr key={i}>
 {console.log(student.RollNo)}
 <td>{student.RollNo}</td>
 <td>{student.Name}</td>
                    </tr>
                   
                  ))
                }
                </tbody>
              </table>
            </div>
              </div>
            </div>
        }
      </div>
  )
}

export default ViewBatches
// import React, { useState } from 'react'
// import axios from 'axios'

// const AdminHome = () => {
  
//   const [file, setFile] = useState([]);

//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("myFile", file);

//     await axios.post("http://localhost:5000/sami", formData).then((res)=>{
//         alert(res.data)
//     }).catch((err)=>{
//        console.log(err)
//     })

//   };

//   const handleChange = (e) => {
//     //  console.log(e.target.files[0].type)
//     if(e.target.files[0].type != 'text/csv')
//       alert('Please upload a csv file')
//     else setFile(e.target.files[0])
//   }
  
//   return (
//     <React.Fragment>
//       <div className='addBatch'>
//       <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
//         <label htmlFor='file'> Choose file to Upload: </label> <br />
//         <br />
//         <input type="file" name="file" accept=".csv" onChange={handleChange}/>
//         <button type="submit">Upload</button>
//       </form>

//       </div>
//     </React.Fragment>
//   )
// }

// export default AdminHome

import React, { useEffect } from 'react'
import SideNavbar from './SideNavbar'
import { useNavigate } from 'react-router-dom'
const AdminHome = () => {
 
  
  const navigate = useNavigate();
  var isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  const handleLogout = () =>{
    localStorage.setItem('isAdminLoggedIn',"false");
    navigate('/login')
  }
  useEffect(() => {
    if(isAdminLoggedIn=="false")
        navigate('/login')
  },[isAdminLoggedIn])
  return (
    <div>
      
      <SideNavbar/>
      <div className='mainhomefac'>
    <div className='homepagefac'>
      {/* <h1>helloo</h1> */}
    </div>
    <div className='right'>
   <div className='rightcontent'>
    <h1>Welcome back !</h1>
   </div>
    </div>
   </div>
      {/* <button onClick={()=> handleLogout()}>Logout</button> */}
    </div>
  )
}

export default AdminHome
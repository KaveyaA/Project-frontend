import React,{useState} from 'react'
import SideNavbar from './SideNavbar'
import '../../styles/admin/AddBatch.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBatch = () => {
  const [file, setFile] = useState([]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("myFile", file);

    await axios.post("http://localhost:5000/addbatch", formData).then((res)=>{
        // alert(res.data);
        toast.success(res.data,{position: "top-center",autoClose:3000})
         
    }).catch((err)=>{
       console.log(err)
    })

  };

  const handleChange = (e) => {
    //  console.log(e.target.files[0].type)
    if(e.target.files[0].type != 'text/csv')
      alert('Please upload a csv file')
    else setFile(e.target.files[0])
  }
  return (
    <>
    <SideNavbar/>
    <div className='body'>
    <div className='addbatch'>
      <p id='addbatchheading'>Add New Batch</p>
    <p id="instHeading">Instructions to upload new student's list</p>
    <div className='instr'>
    <ol><li> CSV file should be named with 'CourseName-Year'. For example,MCA students 
        of batch 2021-2023 should be named as 'MCAREG-21-23.csv'.</li>
        <li>The file must have only two columns 'RollNo' and 'Name'.</li>
        <li>Double check the details before uploading the file.</li>
        <li>Ensure that their is no empty fields in the file.</li>
        
    </ol>
       
        
    </div>
    <div className='upload'>
      <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
        <label htmlFor='file' id="choosefile"> Choose file to Upload: </label> <br />
        <br />
        <input type="file" name="file" accept=".csv" onChange={handleChange} id="#choosefilebutton"/><br></br>
        <button type="submit" className='button'>Upload</button>
      </form>

      </div>
    
    </div>
    <ToastContainer/>
    </div>
    </>
  )
}

export default AddBatch
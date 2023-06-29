import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import '../../styles/main/LoginPage.css'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

  const [id, setId] = useState('');
  const [password, setPass] = useState('');
  const[facid, setfacid] = useState('');
  const[facpass, setfacpass] = useState('')
  const navigate = useNavigate()
  

  const loginFaculty = (e) => {
     e.preventDefault()
    
     if(facid=="")
        {toast.error("Please,enter your ID",{position: "top-center",autoClose:3000})
        
      }
      else if(facpass=="")
              toast.error("Please, enter your password",{position: "top-center",autoClose:3000})
else{
  console.log(facid,facpass)
    axios.post('http://localhost:5000/loginFaculty',{
      
      facultyId : facid,
      facultyPassword : facpass,
    })
    .then((res) => {
    
      if(res.data == 'Login successful'){
        localStorage.setItem('facultyId',facid)
        localStorage.setItem('isFacLoggedIn',"true")
        navigate('/facultyhome')
// localStorage.setItem('auth',true)

      }
      
    })
    .catch((err) => {
      toast.error("Invalid credentials",{position: "top-center",autoClose:3000})
      console.log(err);

    })
    
  }
}

  const loginAdmin = (e)=>{
      e.preventDefault()
      if(id=="")
        {toast.error("Please,enter your ID",{position: "top-center",autoClose:3000})
        
      }
      else if(password=="")
              toast.error("Please, enter your password",{position: "top-center",autoClose:3000})
else{
  console.log(id,password)
    axios.post('http://localhost:5000/loginAdmin',{
      adminId : id,
      adminPassword : password
    }).then((res) => {
      localStorage.setItem('adminId',id);
      localStorage.setItem('isAdminLoggedIn',"true")
      navigate('/adminhome')
      
    }).catch((err) => {
      toast.error("Invalid credentials",{position: "top-center",autoClose:3000})
      console.log(err)
    })
    
   }
}

  return (
    <React.Fragment>
      <Navbar/>
      <div className='login'>

      <div className='adminBox'>
        <fieldset className='fieldset'>
          <legend><h2 className='loginfor'>For Admin</h2></legend>
        
          <input type='text' placeholder='Enter your id' onChange={(e) => 
            setId(e.target.value) }/>
          <input type='password' placeholder='Enter your password'
          onChange={(e) => 
            setPass(e.target.value) }
          /><br></br>
       <button onClick={loginAdmin} className='button'>Login</button>
       </fieldset>
      </div>


      <div className='facultyBox'>
      <fieldset className='fieldset'>
          <legend><h2 className='loginfor'>For Faculty</h2></legend>
          <input type='text' placeholder='Enter your id'
          onChange={(e) => setfacid(e.target.value) }
          />
          <input type='text' placeholder='Enter your password'
           onChange={(e) => setfacpass(e.target.value) }
          /><br></br>
          <button onClick={loginFaculty} className='button'>Login</button>
          </fieldset>
      </div>


      </div>
      <Footer/>
      <ToastContainer />
      </React.Fragment>
  )
}

export default LoginPage
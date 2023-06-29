import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import './../../styles/main/Home.css'

const Home = () => {
  return (
    <>
        <Navbar/>
        <marquee direction="right">
        <p id="newsdiv">NBA visit to be held on 15<sup>th</sup> and 16<sup>th</sup> of June.</p>
        </marquee>
         <div className='homebody'>
<div className='imgdiv'>
<img src='./istimage.png' height="300px" width="400px"/>
</div>
<div className='infohomediv'>
<p id="homewelcome">WELCOME TO</p>
<p id="homeheading">IST Department, Anna University</p><br></br>
Anna University is a public state university located in Tamil Nadu, India. The main campus is in Chennai. It was originally established on 4 September 1978. Anna University (Chennai) comprises four colleges - The College of Engineering (CEG, Guindy Campus), The Alagappa College of Technology (ACT, Guindy Campus), The Madras Institute of Technology (MIT, Chromepet Campus) and The School of Architecture and Planning (SAP, Guindy Campus). The University is celebrating its 225 year of it inception.

Department of Information Science and Technology (IST) is carved out of the Department of Computer Science and Engineering in May 2010.The Department functions under the Faculty of Information and Communication Engineering.
IST functions as one of the University Departments having academic autonomy with its own syllabus and curriculum. It offers undergraduate and postgraduate programme in Information Technology, Information Technology (Specialization in Artificial Intelligence and Data Science) and Master of Computer Applications. Dr.S.Sridhar is current Head of the Department.
 
</div>
   </div>
     <Footer/>   
       
   </>
  )
}

export default Home
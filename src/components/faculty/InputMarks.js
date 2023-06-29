import React,{useState,useEffect, useRef} from 'react'
import FacultyNav from './FacultyNav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../../styles/faculty/InputMarks.css'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputMarks = () => {
  const navigate = useNavigate()
  const[showPopUp, setShowPopUp] = useState(false)
  const[roll,setRoll] = useState('')
 const[q1TOBeEdited,setQ1ToBeEdited] = useState('')
 const[rollToBeEdited, setRollToBeEdited] = useState('')
 const[qTOBeEdited,setQToBeEdited] = useState('')
 const[index, setIndex] = useState(0)
 const[target, setTarget] = useState(0)
 const[initialInputs,setInitialInputs] = useState(true)
  const[course,setCourse] = useState('')
    const[atype,setatype] = useState('')
    const facultyId = localStorage.getItem("facultyId")
    const[myCourses, setMyCourses] = useState([])
    const[batch,setBatch] = useState('')
    const[ cidatype,setcidatype] =useState('');
const[studentList,setStudentList] = useState([])
const [currentIndex, setCurrentIndex] = useState(0); // Added state to track current index

const [documents, setDocuments] = useState([]);
const[savebutton,setsavebutton] = useState(false)
const[showDisplayTable,setShowDisplayTable] = useState(false)
const[showGenerateCo,setShowGenerateCo] = useState(false)
const[endsem,setEndSem] = useState(false)

const [selectedRow, setSelectedRow] = useState(null);


const[proceed,setProceed] = useState(false)
const inputRef = useRef(null)
const handleNext = async() => {
  setCurrentIndex(0);
  console.log('batch1 ', batch)
 console.log('course1',course)
 console.log('atype1',atype)
 await axios.post('http://localhost:5000/getstudentlist',{
  batch:batch
}).then(res=>setStudentList(res.data))

 if(atype=='e'){
  setEndSem(true)
 }
 // setcidatype(course+'-'+atype+'-')
  //setcidatype(course.concat('-',atype))
  console.log('cidatype1', cidatype)
  setcidatype(batch+course+atype)

//check if question paper is set
  
  axios.post('http://localhost:5000/checkqpaper',{
        bidcidatype : cidatype
      })
      .then(
       async( res) => {
          if(res.data == 'Question paper is already set.'){
                 //check if marks is already entered
                 console.log('qp paper set')
              await axios.post('http://localhost:5000/checkmarks',{
                cidatyperoll : cidatype
              })
              .then(
                res =>{
                  if(res.data == 'Present'){
                    console.log('marks present')
                    setProceed(false)
                    console.log('proceed',proceed)
                    toast.warning("Marks is already entered",{position: "top-center",autoClose:3000})
                    setBatch('')
                    setatype('')  
                    setCourse('')
              
                  }
                  else{
                    console.log('marks not present')
                   setProceed(true)
                   console.log('proceed',proceed)
                  }
                }
              )

          }
          else{
            toast.warning("Question paper is not yet set!",{position: "top-center",autoClose:3000})
            setProceed(false)
            setBatch('')
            setatype('')
            setCourse('')
          }
        }
      )
  // based on proceed value
  if(proceed){
    await axios.post('http://localhost:5000/getstudentlist',{
      batch:batch
    }).then(res=>setStudentList(res.data))
    console.log('stulist',studentList)
    setInitialInputs(!initialInputs);
    setsavebutton(!savebutton)
  }
 
      
  }

useEffect(() => {
        axios.post('http://localhost:5000/facultycourses',{
          facultyId : facultyId
        }).then(res => setMyCourses(res.data))
      },[facultyId])

useEffect(()=>{
  setcidatype(batch+course+atype)
},[batch,course,atype])

      const [marksData, setMarksData] = useState({
      cidatyperoll : 'Nil',
      q1 : 0,
      q2 : 0,
      q3 : 0,
      q4 : 0,
      q5 : 0,
      q6 : 0,
      q7 : 0,
      q8 : 0,
      q9 : 0,
      q10 :0,
      
      });

      const[marksDataend, setMarksDataend] =useState(
        {
          cidatyperoll : 'Nil',
          q1 : 0,
          q2 : 0,
          q3 : 0,
          q4 : 0,
          q5 : 0,
          q6 : 0,
          q7 : 0,
          q8 : 0,
          q9 : 0,
          q10 :0,
          q11 : 0,
          q12 : 0,
          q13 : 0,
          q14 : 0,
          q15 : 0,
          q16 : 0,


        }
      )
        // const[rollToDisplay, setRollToDisplay] = useState([]);


      const handleChange = (e,roll) => {
        const { name, value } = e.target;
       
            marksData.cidatyperoll = cidatype.concat(roll);
        
        setMarksData((prevState) => ({
         
          ...prevState,
          [name]: value
        }));

        // console.log(name,value)
        // console.log('cidatyperoll',marksData.cidatyperoll)
        // console.log('chane',currentIndex)
      };
     
      const handleChangeEnd = (e,roll) => {
        const { name, value } = e.target;
       
        marksDataend.cidatyperoll = cidatype.concat(roll);
    
    setMarksDataend((prevState) => ({
     
      ...prevState,
      [name]: value
    }));
    console.log(marksDataend)
      }

      const handleSendDocuments = () => {
        console.log(documents)
        setShowDisplayTable(!showDisplayTable)
        if(atype == 'e'){
          axios.post('http://localhost:5000/addendsemmarks',{
            documents : documents 
          })
            .then((res) => console.log(res.data))
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error(error);
            });
        }
        else{
        axios.post('http://localhost:5000/addassessmarks',{
          documents : documents
        })
          .then((res) => console.log(res.data))
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error(error);
          });
       }
  
        // Clear the documents array
        setDocuments([]);
        //setShowDisplayTable(false)
        setShowGenerateCo(true)
      };


      const handleSubmit = (e) => {
        setShowDisplayTable(true)
        e.preventDefault()
 
  //  console.log('click',click)
   
   if(currentIndex < studentList.length -1)
   {setCurrentIndex(prevIndex => prevIndex + 1);
  console.log('cuu',currentIndex)
  console.log('lengh',studentList.length)
   
  }else if(currentIndex == studentList.length-1){
    setsavebutton(!savebutton)
  }
  
        // Create a new document based on the marksData and add it to the documents array
        const newDocument = { ...marksData };
        setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    //console.log('marksdata',marksData)
        // Clear the form inputs
        //studentList[currentIndex]?.RollNo
        setMarksData({
          cidatyperoll :'Nil',
          q1 : 0,
          q2 : 0,
          q3 : 0,
          q4 : 0,
          q5 : 0,
          q6 : 0,
          q7 : 0,
          q8 : 0,
          q9 : 0,
          q10 : 0,
          
        });
        console.log(documents)
      
      }

      const handleSubmitEnd = (e) => {
        setShowDisplayTable(true)
        e.preventDefault()
 
  //  console.log('click',click)
   
   if(currentIndex < studentList.length -1)
   {setCurrentIndex(prevIndex => prevIndex + 1);
  console.log('cuu',currentIndex)
  console.log('lengh',studentList.length)
   
  }else if(currentIndex == studentList.length-1){
    setsavebutton(!savebutton)
  }
  
        // Create a new document based on the marksData and add it to the documents array
        const newDocument = { ...marksDataend };
        setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
    //console.log('marksdata',marksData)
        // Clear the form inputs
        //studentList[currentIndex]?.RollNo
        setMarksDataend({
          cidatyperoll :'Nil',
          q1 : 0,
          q2 : 0,
          q3 : 0,
          q4 : 0,
          q5 : 0,
          q6 : 0,
          q7 : 0,
          q8 : 0,
          q9 : 0,
          q10 : 0,
          q11 : 0,
          q12 : 0,
          q13 : 0,
          q14 : 0,
          q15 : 0,
          q16 : 0,
          
        });
        console.log(documents)
      
      }

      const handleEdit= (index) => {
      
        console.log(index,'is clicked')
      
        setIndex(index)

        setSelectedRow(index);
        setTimeout(() => {
          setSelectedRow(null);
        }, 1000); 
      }

       var testvalue = "abc"
       const newTo ={
        pathname : `/performance/${testvalue}`,
       // state:{ param1:"abcd"},
        

       };
   

       const handleCOCalculation = async(req, res) => {
        console.log('hii')
         await axios.post('http://localhost:5000/calculateco',{
            batchidcidatype : cidatype, target:target
          }).then(async(res) =>
            {console.log( res.data)
            return await axios.post('http://localhost:5000/co',{
              batchidcidatype : cidatype
            }).then(res =>console.log(res.data) )
            });
        navigate('/mycourses')
       }
       var b = cidatype.substring(0,cidatype.length-1)
       console.log('b cid',b)
        const handleEditChange = (e) => {
          documents[index].q1 = e.target.value
          console.log(e.target.value)

        }
        const sami = (e) => {
console.log(e.target.value)
documents[index].q1 = e.target.value;
console.log('guuu',documents)
        }
  return (
   <>
   <FacultyNav/>
   {initialInputs && <div className='cadiv'>
    <p id="caheading">Enter marks</p>
   

        <div className='labelinput'>
       <label> Batch:</label>
    
           <select
            disabled={false}
          
            onChange={(e)=>setBatch(e.currentTarget.value)} 
            value={batch}>
               <option></option>
            {myCourses.map((item,i) => (
            <option key={i} value={item.batch}>
                {item.batch}
            </option>
            ))}
        </select>
        </div>

        <div className='labelinput'>
       <label> Course:</label>
    
           <select
            disabled={false}
           onChange={(e) =>setCourse(e.currentTarget.value)}
           // onChange={(e) => setCourse(e.currentTarget.value)}
            value={course}
            >
               <option></option>
            {myCourses.map((item,i) => (
            <option key={i} value={item.courseName}>
                {item.courseName}
            </option>
            ))}
        </select>
        </div>

        <div className='labelinput'>
          <label>Assessment Type</label>
          <select value={atype} onChange={(e) => setatype(e.currentTarget.value)}>
            <option></option>
            <option value="1">Assessment 1</option>
            <option value="2">Assessment 2</option>
            <option value="e">End - Semester</option>
          </select>
        </div>
        <button className='button' onClick={handleNext}>Next</button>

        </div>
}
{savebutton && !endsem &&
<div className='cadiv'>
        <table className='displaytable'> 
          <thead>
            <tr>
              <td className='displayroll'>Roll No</td>
              <td className='displaytd'>Q1</td>
              <td className='displaytd'>Q2</td>
              <td className='displaytd'>Q3</td>
              <td className='displaytd'>Q4</td>
              <td className='displaytd'>Q5</td>
              <td className='displaytd'>Q6</td>
              <td className='displaytd'>Q7</td>
              <td className='displaytd'>Q8</td>
              <td className='displaytd'>Q9</td>
              <td className='displaytd'>Q10</td>
              
            </tr>
          </thead>
          <tbody>
             {
            studentList.length > 0 && (
              <tr>
                <td><input
    type='text'
    name='cidatyperoll'
    value={studentList[currentIndex].RollNo}
    readOnly
  /></td>
                <td ><input type='text' name='q1' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q1}/></td>
                <td ><input type='text' name='q2' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q2}/></td>
                <td ><input type='text' name='q3' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q3}/></td>
                <td ><input type='text' name='q4' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q4}/></td>
                <td ><input type='text' name='q5' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q5}/></td>
                <td ><input type='text' name='q6' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q6}/></td>
                <td ><input type='text' name='q7' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q7}/></td>
                <td ><input type='text' name='q8' id="cobl"  onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q8}/></td>
                <td ><input type='text' name='q9' id="cobl"  onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q9}/></td>
                <td ><input type='text' name='q10' id="cobl" onChange={(e)=>handleChange(e,studentList[currentIndex].RollNo)} value={marksData.q10}/></td>
               
              </tr>
            )
          }
          </tbody>
        </table>
<button onClick={(e) =>handleSubmit(e)} className='savebutton' >Save and Next</button>
      </div> 
}  <br></br>
    
 {
  savebutton && endsem && 
  <div className='cadiv'>
        <table className='displaytable'> 
          <thead>
            <tr>
              <td className='displayroll'>Roll No</td>
              <td className='displaytd'>Q1</td>
              <td className='displaytd'>Q2</td>
              <td className='displaytd'>Q3</td>
              <td className='displaytd'>Q4</td>
              <td className='displaytd'>Q5</td>
              <td className='displaytd'>Q6</td>
              <td className='displaytd'>Q7</td>
              <td className='displaytd'>Q8</td>
              <td className='displaytd'>Q9</td>
              <td className='displaytd'>Q10</td>
              <td className='displaytd'>Q11</td>
              <td className='displaytd'>Q12</td>
              <td className='displaytd'>Q13</td>
              <td className='displaytd'>Q14</td>
              <td className='displaytd'>Q15</td>
              <td className='displaytd'>Q16</td>
              
            </tr>
          </thead>
          <tbody>
             {
            studentList.length > 0 && (
              <tr>
                <td><input
                    type='text'
                    name='cidatyperoll'
                    value={studentList[currentIndex].RollNo}
                    readOnly
  /></td>
                <td ><input type='text' name='q1' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q1}/></td>
                <td ><input type='text' name='q2' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q2}/></td>
                <td ><input type='text' name='q3' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q3}/></td>
                <td ><input type='text' name='q4' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q4}/></td>
                <td ><input type='text' name='q5' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q5}/></td>
                <td ><input type='text' name='q6' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q6}/></td>
                <td ><input type='text' name='q7' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q7}/></td>
                <td ><input type='text' name='q8' id="cobl"  onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q8}/></td>
                <td ><input type='text' name='q9' id="cobl"  onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q9}/></td>
                <td ><input type='text' name='q10' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q10}/></td>
               
                <td ><input type='text' name='q11' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q11}/></td>
                <td ><input type='text' name='q12' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q12}/></td>
                <td ><input type='text' name='q13' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q13}/></td>
                <td ><input type='text' name='q14' id="cobl"  onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q14}/></td>
                <td ><input type='text' name='q15' id="cobl"  onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q15}/></td>
                <td ><input type='text' name='q16' id="cobl" onChange={(e)=>handleChangeEnd(e,studentList[currentIndex].RollNo)} value={marksDataend.q16}/></td>
               
              </tr>
            )
          }
          </tbody>
        </table>
<button onClick={(e) =>handleSubmitEnd(e)} className='savebutton' >Save and Next</button>
      </div> 
 }

 

 { showDisplayTable && !endsem && <div className='cadiv'>
 <b><p style={{fontSize: '1.5rem'}}>Marks Preview</p></b>
 <table className='displaytable'>
  <thead>
  <tr>
              <td className='displayroll'>Roll No</td>
              <td className='displaytd'> Q1</td>
              <td className='displaytd'>Q2</td>
              <td className='displaytd'>Q3</td>
              <td className='displaytd'>Q4</td>
              <td className='displaytd'>Q5</td>
              <td className='displaytd'>Q6</td>
              <td className='displaytd'>Q7</td>
              <td className='displaytd'>Q8</td>
              <td className='displaytd'>Q9</td>
              <td className='displaytd'>Q10</td>
              
            </tr>
  </thead>
  <tbody>

 
 {documents.map((value, index) => (
  <tr key={index}    className={selectedRow === index ? 'highlighted' : 'displaytr'}
>
     <td className='displayroll' >{studentList[index].RollNo}</td>

 {/* <td className='displayroll' >{value.cidatyperoll}</td> */}
 {/* <td className='displaytd' >{value.q1}</td> */}
 <td className='displaytd' >

  <input type='text'  defaultValue={value.q1}  onChange={sami}/>
 </td>

 <td className='displaytd'>
 <input type='text'  defaultValue={value.q2}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q3}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q4}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q5}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q6}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q7}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q8}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q9}  onChange={sami}/>
 
 </td>
 <td className='displaytd'>
 <input type='text'  defaultValue={value.q10}  onChange={sami}/>
 
 </td>
 <td className='displaytd'><FontAwesomeIcon icon={faPencil} style={{color : "#106470"}} onClick={()=> handleEdit(index)}/></td>
  </tr>
         
        ))}
   </tbody>
 </table>
 <button>confirm</button>
 <button onClick={handleSendDocuments} className='button'>Submit</button>
 </div>
}
{
  showDisplayTable && endsem && 
  <div className='cadiv'>
   <h3><b><p>Marks Preview</p></b></h3> 
 <table className='displaytable'>
  <thead>
  <tr>
  
              <td className='displayroll'>Roll No</td>
              <td className='displaytd'> Q1</td>
              <td className='displaytd'>Q2</td>
              <td className='displaytd'>Q3</td>
              <td className='displaytd'>Q4</td>
              <td className='displaytd'>Q5</td>
              <td className='displaytd'>Q6</td>
              <td className='displaytd'>Q7</td>
              <td className='displaytd'>Q8</td>
              <td className='displaytd'>Q9</td>
              <td className='displaytd'>Q10</td>
              <td className='displaytd'>Q11</td>
              <td className='displaytd'>Q12</td>
              <td className='displaytd'>Q13</td>
              <td className='displaytd'>Q14</td>
              <td className='displaytd'>Q15</td>
              <td className='displaytd'>Q16</td>
              
            </tr>
  </thead>
  <tbody>

 
 {documents.map((value, index) => (
  <tr key={index} className='displaytr'>
    <td className='displayroll' >{studentList[index].RollNo}</td>

 {/* <td className='displayroll' >{value.cidatyperoll}</td> */}
 <td className='displaytd' >{value.q1}</td>
 <td className='displaytd'>{value.q2}</td>
 <td className='displaytd'>{value.q3}</td>
 <td className='displaytd'>{value.q4}</td>
 <td className='displaytd'>{value.q5}</td>
 <td className='displaytd'>{value.q6}</td>
 <td className='displaytd'>{value.q7}</td>
 <td className='displaytd'>{value.q8}</td>
 <td className='displaytd'>{value.q9}</td>
 <td className='displaytd'>{value.q10}</td>
 <td className='displaytd' >{value.q11}</td>
 <td className='displaytd'>{value.q12}</td>
 <td className='displaytd'>{value.q13}</td>
 <td className='displaytd'>{value.q14}</td>
 <td className='displaytd'>{value.q15}</td>
 <td className='displaytd'>{value.q16}</td>

 <td className='displaytd'><FontAwesomeIcon icon={faPencil} style={{color : "#106470"}} onClick={()=> handleEdit({value})}/></td>
  </tr>
         
        ))}
   </tbody>
 </table>
 
 <button onClick={handleSendDocuments} className='button'>Submit</button>
 </div>
 
}
{
  showGenerateCo &&
  <div className='cadiv'>
  <label>Enter target</label>
  <input type='text' onChange={(e) =>setTarget(e.target.value)} value={target} />
  {/* <Link to={newTo} state={{batchidcidatype1 : cidatype}} onClick={handleCOCalculation} >Generate Course Outcome</Link> */}
<button className='button' onClick={handleCOCalculation} >Generate Course Outcome</button>
  </div>
// state={{some : "val"}}
}
{
  showPopUp && <h2>kv</h2>
}

{
  showPopUp && <div className='editfacpopup'>
    <h2>Update Marks</h2>
    Roll : <input type='text' value={rollToBeEdited}/>

    Q1: <input type='text' onChange={handleEditChange} defaultValue={q1TOBeEdited} />
    <button onClick={setShowPopUp(!showPopUp)}> ok</button>
  <br></br>
  </div>
 }

<ToastContainer />
   </>
  )
}

export default InputMarks
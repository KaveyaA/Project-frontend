import React,{useState,useEffect,useRef} from 'react'
import FacultyNav from './FacultyNav'
import axios from 'axios'
import '../../styles/faculty/QuestionTemplate.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactToPrint from "react-to-print";
import { useNavigate } from 'react-router-dom';
// end sem 20 2marks, 5 13 marks, 1 15 marks
// assess sec A - 7 2marks, sec B- 2 13marks, sec c - 10marks

export const ComponentB = React.forwardRef((props, ref) => {
  console.log(props.val)
  return (
    <div ref={ref} className='cadiv'>
      
      <p id="qpdetails">DEPARTMENT OF INFORMATION SCIENCE AND TECHNOLOGY 
CEG CAMPUS, ANNA UNIVERSITY CHENNAl</p>
        
 <p id="qpcname">AE5091 - {props.course}</p>
 {/* <p>{props.assess}</p> */}
 <p>Regulation 2019 (CBCS)</p>

 {/* <div>
    <span>Programme{props.assess}</span><br></br>
    <span>Date of Exam:{props.assess}</span><br></br>
    <span>Max marks: 50</span>
 </div> */}

 <div >
 <p id="qpdetails">Course Learning Outcomes</p> <br></br>
[CO1]. Apply the search techniques to real-time problems<br></br>
[CO2]. Understand the underpinnings of Logic and Reasoning <br></br>
[CO3]. Choose and implement classification or regression algorithms for an application using an open-source tool.<br></br>
[CO4]. Implement probabilistic discriminative and generative algorithms for an application and analyse the results. <br></br>
[CO5]. Use a tool to implement typical clustering algorithms for different types of applications. <br></br>
[Co6]. Implement appropriate leaning algorithms for any real time application using an open-source tool.<br></br> 
 </div>
 <br></br>
 <br></br>
 <table className='printqptable'>
            <thead>
              <tr>
                <td>No</td>
                <td>Question</td>
                <td>Marks</td>
                <td>CO</td>
                <td>BL</td>
              </tr>
            </thead>
            <tbody>

              {
                props.val.map((i,k)=>(
                  <tr key={k}>
                    <td> {i.qNo}</td>
                    <td id="qtext"> {i.qText}</td>
                    <td>{i.marks}</td>
                    <td>{i.co}</td>
                    <td>{i.bl}</td>
                   
                   
                  </tr>
                ))
              }
              </tbody>

              </table>
     
    </div>
  );
});


const QuestionPaperTemplate = () => {
  const navigate = useNavigate()
  const componentRef = useRef();
  const[remaining,setRemaining] = useState(true)
  const[addbutton,ableAdd] = useState(true)
    const[course,setCourse] = useState()
    const[length,setLength] = useState()
    const[atype,setatype] = useState()
    const facultyId = localStorage.getItem("facultyId")
    const[myCourses, setMyCourses] = useState([])
    const[batch,setBatch] = useState()
    const[showAssess,setshowAssess] =useState(false)
    const[showEndSem, setShowEndSem] = useState(false)
    const[batchidcid,setbidcid] =useState();
const[title,setTitle] = useState('')
const[showInitialValues, setShowInitialValues] = useState(true)
    

    useEffect(()=>{
      setbidcid(batch+course+atype)
    },[batch,course,atype])

    useEffect(() => {
        axios.post('http://localhost:5000/facultycourses',{
          facultyId : facultyId
        }).then(res => setMyCourses(res.data))
      },[facultyId])
   
const[co1q,setCo1q] = useState([])
const[co2q,setCo2q] = useState([])
const[co3q,setCo3q] = useState([])
const[co4q,setCo4q] = useState([])
const[co5q,setCo5q] = useState([])
const[co6q,setCo6q] = useState([])




    const handleNext = () => {
      //check if q paper is already uploaded
      setbidcid(batch+course+atype)
      axios.post('http://localhost:5000/checkqpaper',{
        bidcidatype : batchidcid
      }).then(res => {
        if(res.data == 'Question paper is already set.')
        {
          console.log('already')
          toast.warning("Question paper is already set",{position: "top-center",autoClose:3000})
          setBatch('')
          setCourse('')
          setatype('')
        }
        else{
          console.log(res.data)
          setshowAssess(true)
        if(atype == 'e' ){
       setTitle('End Semester')
      setLength(16)
        }else{
         setTitle('Assesment'+ atype)
         setLength(10)
        }
       
        console.log(batchidcid)
setShowInitialValues(false)
        }
      })
//       setshowAssess(true)
//         if(atype == 'e' ){
//        setTitle('End Semester')
//       setLength(16)
//         }else{
//          setTitle('Assesment'+ atype)
//          setLength(3)
//         }
       
//         console.log(batchidcid)
// setShowInitialValues(false)
        
       }

       const[question, setQuestion] = useState({
        qNo:'',
        qText:'',
        marks : '',
        co:'',
        bl : '',
    })

    const[allQuestions, setAllQuestions] = useState([])

    const handleChange= (e) => {

        const {name, value} = e.target;
        setQuestion(( prevState ) => ({
            ...prevState,
            [name] : value
        }));
    }
    
    const handleAllQuestions = () => {
        if(length>=1){
          toast.error("Fill all questions",{position: "top-center",autoClose:3000})
        }
       else{
        console.log('finally qll q',allQuestions)
       axios.post('http://localhost:5000/addcoqpmapping',{
        batchidcidatype:batchidcid,co1q: co1q,co2q: co2q,co3q:co3q,co4q: co4q,co5q:co5q,co6q:co6q
      
        }).then(() => {
          toast.success("Question paper submitted successfully",{position: "top-center",autoClose:3000})
       
        })
         // pdfgenerate()
         setAllQuestions([])
        setShowInitialValues(true)
        setBatch('')
        setatype('')
        setCourse('')
        setshowAssess(false)
        setQuestion({
          qNo:'',
          qText:'',
          marks : '',
          co:'',
          bl : '',
      })
    }
  }

      const handleSubmit = (e) => {
        e.preventDefault(); 

       if(length>=0){
        setLength(length-1)
       if(length <=1){
        ableAdd(false)
        setRemaining(false)
       }
        const newQuestion = { ...question};

        setAllQuestions(( prevAllQuestions ) =>  
        [...prevAllQuestions, newQuestion] 
        );

        const coValues = question.co.split(',').map((co) => co.trim());
    for(let i in coValues){
       // console.log(coValues[i])
       if(coValues[i] == 'CO1'){
        setCo1q((prev) => [...prev,question.qNo])
//co1q.push(question.qNo)
           console.log('lolo co1q',co1q)   
           
       }
       if(coValues[i] == 'CO2'){
           //co2q.push(question.qNo)
           setCo2q((prev) => [...prev,question.qNo])
           console.log('jiiji co2q',co2q)  
       }
       if(coValues[i] == 'CO3'){
          // co3q.push(question.qNo)
          setCo3q((prev) => [...prev,question.qNo])
       }
       if(coValues[i] == 'CO4'){
          // co4q.push(question.qNo)
          setCo4q((prev) => [...prev,question.qNo])
       }
       if(coValues[i] == 'CO5'){
         //  co5q.push(question.qNo)
         setCo5q((prev) => [...prev,question.qNo])
       }
       if(coValues[i] == 'CO6'){
          // co6q.push(question.qNo)
          setCo6q((prev) => [...prev,question.qNo])
       }

    }
    console.log('allq',allQuestions)
   
         setQuestion({
            qNo:'',
            qText:'',
            marks : '',
            co:'',
            bl : '',
        })
       
    
      }
  }

  return (
   <>
   <FacultyNav/>
   {showInitialValues && 
    <div className='cadiv'>
    <p id="caheading">Generate Question Paper</p>
   

        <div className='labelinput'>
       <label> Batch:</label>
    
           <select
            disabled={false}
            value={batch}
            onChange={(e) => setBatch(e.currentTarget.value)}>
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
            value={course}
            onChange={(e) => setCourse(e.currentTarget.value)}>
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
          <select onChange={(e) => setatype(e.currentTarget.value)} value={atype} >
            <option></option>
            <option value="1">Assessment 1</option>
            <option value="2">Assessment 2</option>
            <option value="e">End - Semester</option>
          </select>
        </div>
        <button className='button' onClick={handleNext}>Next</button>

        </div>

        }
        
{
showAssess && 
<div className='cadiv'>
<p id="qpdetails">Enter question paper details</p>
<span id="qptitles">{title}</span>
<br></br>
{
  setRemaining &&
<>
<span  id="qplength">Remaining questions: {length} </span>
</>

}
<form onSubmit={handleSubmit} className='questions'>
           <table className='qpapertable'>
            <thead>
              <tr>
                <td>Q No</td>
                <td>Question</td>
                <td>Marks</td>
                <td>CO</td>
                <td>BL</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>  <input type='text' name="qNo" 
        onChange={handleChange}  value={question.qNo}/></td>

        <td>  <input type='text' name="qText" id="qtext"
        onChange={handleChange}  value={question.qText}/></td>

        <td><input type='text' name="marks" 
        onChange={handleChange}  value={question.marks}/></td>

        <td><select name="co" 
        onChange={handleChange}  value={question.co}>
    <option></option>
    <option>CO1</option>
    <option>CO2</option>
    <option>CO3</option>
    <option>CO4</option>
    <option>CO5</option>
    <option>CO6</option>
    <option>CO1,CO2</option>
    <option>CO3,CO2</option>
    <option>CO4,CO2</option>
    <option>CO5,CO2</option>
    <option>CO6,CO2</option>
</select>
</td>
<td>
<select name="bl" 
        onChange={handleChange} id="cobl" value={question.bl}>
          <option>L1</option>
          <option>L2</option>
          <option>L3</option>
          <option>L4</option>
          <option>L5</option>
          <option>L6</option>


          </select>
</td>
<td>
  {
    addbutton && <button type="submit" className='button'>Add</button> 

  }
</td>
              </tr>
            </tbody>
           </table> 
   </form>
   {/* <input type='text' onChange={(e) =>setTarget(e.target.value)} value={target} /> */}

    
   <ReactToPrint
          trigger={() => <button className='button'>Print this out!</button>}
          content={() => componentRef.current} // Access the current property of the ref
        />

        {/* component to be printed */}
        {/* style={{ display: "none" }} */}
        <div style={{ display: "none" }}>
          <ComponentB ref={componentRef} val={allQuestions} assess={atype} course={course} />
        </div>

        <button onClick={handleAllQuestions} className='button'>Submit Question Paper</button>
   
</div>
}
{/* {
    showEndSem && 
    
} */}
 <ToastContainer />
   </>
  )
}

export default QuestionPaperTemplate


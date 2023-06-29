import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print';
import FacultyNav from './FacultyNav'
import './../../styles/faculty/COAnalytics.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons'
import { Tooltip, BarChart,  Brush,Bar,CartesianGrid,YAxis,Legend,XAxis,ReferenceLine } from 'recharts';

const COAnalytics = () => {
  const printRef = React.useRef();
const[showPrint, setShowPrint] = useState(false)
    const[course,setCourse] = useState()
    const[copercent,setCopercent] = useState({co1:"",co2:"",co3:"",co4:"",co5:"",co6:""})
   
    const[courseList, setCoursesList] = useState([])
    const[atype,setatype] = useState()
    const[atype2,setatype2] = useState()
    
    const[showChart,setShowChart] = useState(false)

    const[batch,setBatch]=useState()
    const[batch2,setBatch2]=useState()
    const[course2,setCourse2]=useState()

  const[co1,setco1]= useState('')
 const[co2,setco2]= useState('')
 const[co3,setco3]= useState('')
 const[co4,setco4]= useState('')
 const[co5,setco5]= useState('')
 const[co6,setco6]= useState('')

 const[cotwo1,set2co1]= useState('')
 const[cotwo2,set2co2]= useState('')
 const[cotwo3,set2co3]= useState('')
 const[cotwo4,set2co4]= useState('')
 const[cotwo5,set2co5]= useState('')
 const[cotwo6,set2co6]= useState('')

const[batchList, setBatchList] = useState([])

const handlePrint = useReactToPrint({
  content: () => printRef.current,
});

const fetchCoPercentage = async(val1) => {
  return  await axios.post('http://localhost:5000/copercent',{
    batchidcidatype : val1
  })
 }

    const fetchHandler  = async() => {
      return   await axios.get("http://localhost:5000/batcheslist").then((res) => res.data)

      }
    const fetchCouses = async() => {
     return await axios.post('http://localhost:5000/getallcourses',{
        programmeName : "MCA"
    })
    }
      

  useEffect(() =>  {
    fetchHandler().then(data => setBatchList(data.collections))
  },[batchList])

  useEffect(() => {
    fetchCouses().then(res => setCoursesList(res.data));
  },[courseList])

    const data= [
        {
          entity: "CO1",
          value1: co1,
          value2: cotwo1
        },
        {
          entity: "CO2",
          value1: co2,
          value2: cotwo2
        },
        {
          entity: "CO3",
          value1: co3,
          value2: cotwo3
        },
        {
          entity: "CO4",
          value1: co4,
          value2: cotwo4
        },
        {
          entity: "CO5",
          value1: co5,
          value2: cotwo5
        },
        {
          entity: "CO6",
          value1: co6,
          value2: cotwo6
        },

      ];

      const compare = () => {
        
        setShowChart(true)
        console.log('1',batch)
        console.log('1',course)
        console.log(batch+course+atype)
        
console.log('________-')
        console.log('1',batch2)
        console.log('1',course2)
        console.log(batch2+course2+atype2)
        fetchCoPercentage(batch+course+atype).then((res) =>{
          if(res.data === 'no co percentage'){
           console.log('co% under processing')
          // setShow(!show)
          }
          else
          {
             setco1(res.data.co1.$numberDecimal);
             setco2(res.data.co2.$numberDecimal);
             setco3(res.data.co3.$numberDecimal);
             setco4(res.data.co4.$numberDecimal);
             setco5(res.data.co5.$numberDecimal);
             setco6(res.data.co6.$numberDecimal);
             
          }})

          fetchCoPercentage(batch2+course2+atype2).then((res) =>{
            if(res.data === 'no co percentage'){
             console.log('co% under processing')
            // setShow(!show)
            }
            else
            {
               set2co1(res.data.co1.$numberDecimal);
               set2co2(res.data.co2.$numberDecimal);
               set2co3(res.data.co3.$numberDecimal);
               set2co4(res.data.co4.$numberDecimal);
               set2co5(res.data.co5.$numberDecimal);
               set2co6(res.data.co6.$numberDecimal);
               
            }})
            setShowPrint(true)
      }
  return (
    <>
    <FacultyNav/>
    <div  ref={printRef}>
    <p id="headingpo">Compare CO</p>
    <div className='coanalytics'>
        
        <div className='first'>

        <div className='labelinput'>
       <label> Batch:</label>
   
           <select
            disabled={false}
            value={batch}
            onChange={(e) => {setBatch(e.currentTarget.value)
            }}>
               <option></option>
            {batchList.map((batch,i) => (
            <option key={i} value={batch}>
                {batch}
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
            {courseList.map((item,i) => (
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
       
        
        </div>

        <FontAwesomeIcon onClick={compare} icon={faCodeCompare} style={{color : "#106470", fontSize: "4rem",cursor: "pointer",borderRadius:"45%", border: "4px solid #106470",
    padding: "0.25rem"}}/>
     
     <div className='first'>

<div className='labelinput'>
<label> Batch:</label>

   <select
    disabled={false}
    value={batch2}
    onChange={(e) => setBatch2(e.currentTarget.value)}>
       <option></option>
    {batchList.map((batch,i) => (
    <option key={i} value={batch}>
        {batch}
    </option>
    ))}
</select>
</div>

<div className='labelinput'>
<label> Course:</label>

   <select
    disabled={false}
    value={course2}
    onChange={(e) => setCourse2(e.currentTarget.value)}>
       <option></option>
    {courseList.map((item,i) => (
    <option key={i} value={item.courseName}>
        {item.courseName}
    </option>
    ))}
</select>
</div>

<div className='labelinput'>
  <label>Assessment Type</label>
  <select onChange={(e) => setatype2(e.currentTarget.value)} value={atype2} >
    <option></option>
    <option value="1">Assessment 1</option>
    <option value="2">Assessment 2</option>
    <option value="e">End - Semester</option>
  </select>
</div>

</div>

    </div>
   {

    showChart && 
    <div className='coanalytics'>
<div className='restab'>
<p id="headingpo">CO% Attainment</p><br></br>
<table className='resultTable'>
  
    <thead>
    <tr>
      <td></td>
      <td>CO1</td>
      <td>CO2</td><td>CO3</td>
      <td>CO4</td><td>CO5</td>
      <td>CO6</td>
    </tr>
    </thead>
    <tbody>
   <tr>
    <td>{course}</td>
   <td>{co1}</td>
   <td>{co2}</td>
   <td>{co3}</td>
   <td>{co4}</td>
   <td>{co5}</td>
   <td>{co6}</td>

   </tr>

   <tr>
    <td>{course2}</td>
   <td>{cotwo1}</td>
   <td>{cotwo2}</td>
   <td>{cotwo3}</td>
   <td>{cotwo4}</td>
   <td>{cotwo5}</td>
   <td>{cotwo6}</td>

   </tr>
   
    </tbody>
    
   </table>

   </div>
      <BarChart width={600} height={300} data={data} barCategoryGap={20}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="entity" />
  <YAxis domain={[0,100]}/>
  <Tooltip />
  <Legend />
  <Bar dataKey="value1" fill="#8884d8" name={course} />
  <Bar dataKey="value2" fill="#82ca9d" name={course2} />
  <ReferenceLine y={60} stroke="red" strokeWidth={2} label="Target" />
         
</BarChart> 
</div>
   }
   </div>
   {
    showPrint &&  
    <div className='coanalytics'>
<button onClick={handlePrint} className='button'>Print</button>
  
    </div>
    
   }
  
    </>
  )
}

export default COAnalytics
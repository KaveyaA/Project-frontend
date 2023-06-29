import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FacultyNav from './FacultyNav'
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Tooltip, BarChart,  Brush,Bar,CartesianGrid,YAxis,Legend,XAxis,ReferenceLine } from 'recharts';
import './../../styles/faculty/BatchPerformance.css'
import Assess2CO from './Assess2CO'
import EndSemCO from './EndSemCO'

const ViewBatchPerformance = () => {
   const[cos,setCos] = useState({co1Marks:{$numberDecimal:''},co2Marks:{$numberDecimal:''},co3Marks:{$numberDecimal:''},co4Marks:{$numberDecimal:''},co5Marks:{$numberDecimal:''},co6Marks:{$numberDecimal:''}})
   const[copercent,setCopercent] = useState({co1:"",co2:"",co3:"",co4:"",co5:"",co6:""})
    const location = useLocation()
    const {value} = useParams()
    const {state} = useLocation()
   // const[cos,setCos] =useState({})
    const param1 =location.state
 const[cot1,setcot1]=useState('')
 const[cot2,setcot2]=useState('')
 const[cot3,setcot3]=useState('')
 const[cot4,setcot4]=useState('')
 const[cot5,setcot5]=useState('')
 const[cot6,setcot6]=useState('')
const[show,setShow]=useState('')

 const[co1,setco1]= useState('')
 const[co2,setco2]= useState('')
 const[co3,setco3]= useState('')
 const[co4,setco4]= useState('')
 const[co5,setco5]= useState('')
 const[co6,setco6]= useState('')

const[assessTwo,setAssessTwo] = useState([])
const[assessOne,setAssessOne] = useState([])
const[endSem,setEndSem] = useState([])

  useEffect(() => {
    setAssessOne(state.batchidcidatype+'1')
    setAssessTwo(state.batchidcidatype+'2')
    setEndSem(state.batchidcidatype+'e')
  },[state.batchidcidatype])

   const fetchHandler = async(assessOne) => {
    return  await axios.post('http://localhost:5000/getco',{
      batchidcidatype : assessOne
    })
   }
   
   const fetchCoPercentage = async(assessOne) => {
    return  await axios.post('http://localhost:5000/copercent',{
      batchidcidatype : assessOne
    })
   }
   // MCASS-22-24Ethical Hacking2

   useEffect(() => {
     fetchHandler(assessOne).then((res) =>{
      if(res.data==='no cotarget'){
        console.log('Under Process')
        setShow('(Under Process)')
      }
      else{
      setShow('')
        setcot1(res.data.co1Marks.$numberDecimal);
        setcot2(res.data.co2Marks.$numberDecimal);
        setcot3(res.data.co3Marks.$numberDecimal);
        setcot4(res.data.co4Marks.$numberDecimal);
        setcot5(res.data.co5Marks.$numberDecimal);
        setcot6(res.data.co6Marks.$numberDecimal);

      
    }}) ;

     fetchCoPercentage(assessOne).then((res) =>{
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

    },[assessOne])
    
console.log('cot1',cot1)
    //  console.log('cos',cos)
    //  console.log('copercent',copercent)
  console.log('value in parameter',value)
 // console.log('state var',param1)
 //console.log(state.some)
console.log('bidcidatype inga',state.batchidcidatype)
console.log('ass1',assessOne);
console.log('ass2',assessTwo)
   const data = [
    { name: 'CO1', value:  co1},
    { name: 'CO2', value:co2 },
    { name: 'CO3', value: co3 },
    { name: 'CO4', value: co4 },
    { name: 'CO5', value: co5 },
    { name: 'CO6', value:co6 },
    // {name: 'Ab',value:80},
    // {name: 'bc', value:90}
   ];

  const dat= [
    {
      entity: "Entity 1",
      value1: 80,
      value2: 90
    },
    {
      entity: "Entity 2",
      value1: 70,
      value2: 85
    }
  ];
  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  
  return (
    <>
    <FacultyNav/>
    <div ref={printRef} className='printcoa'>
      
    <p id="headingBatch"><center>CO Attainment for {state.batchidcidatype}</center></p>
  
   <div className='batchperformance'> 
    <p id="headingBatch">Assess I</p>{show}
    
   <div className='batchresults'>
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
        <td>CO T(based on Marks)</td>
       <td>{cot1}</td> 
     <td>{cot2}</td>
     <td>{cot3}</td>
     <td>{cot4}</td>
     <td>{cot5}</td>
     <td>{cot6}</td>
       
</tr>
   <tr>
    <td>CO Attainment(in %)</td>
   <td>{co1}</td>
   <td>{co2}</td>
   <td>{co3}</td>
   <td>{co4}</td>
   <td>{co5}</td>
   <td>{co6}</td>

   </tr>
   
    </tbody>
    
   </table>
   <BarChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis domain={[0, 100]}/>
          <Tooltip />
          <Legend />
          
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#106470" background={{ fill: '#eee' }} />
          <ReferenceLine y={60} stroke="red" strokeWidth={2} label="Target" />
         
        </BarChart>
     
        {/* <BarChart width={600} height={300} data={dat}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="entity" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="value1" fill="#8884d8" name="Entity 1" />
  <Bar dataKey="value2" fill="#82ca9d" name="Entity 2" />
</BarChart> */}
</div>


</div>  
<hr></hr>
<div className='batchperformance'>
<p id="headingBatch">Assess II</p>
<Assess2CO val={assessTwo}/>
</div>

<hr></hr>
   <div className='batchperformance'>
   <p id="headingBatch">End Semester</p>
   <EndSemCO val={endSem}/>
   </div>
   </div>
   <div className='batchperformance'>
   <button onClick={handlePrint} className='button'>Print</button>
   </div>
    </>
  )
}

export default ViewBatchPerformance
// MCASS-22-24Ethical Hacking2
// MCASS-22-24Ethical Hacking2
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FacultyNav from './FacultyNav'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Tooltip, BarChart,  Brush,Bar,CartesianGrid,YAxis,Legend,XAxis,ReferenceLine } from 'recharts';
import './../../styles/faculty/BatchPerformance.css'

const EndSemCO = (props) => {
    const[val,setVal] = useState(props.val)
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
 useEffect(()=>{
    setVal(props.val)
  })
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
   const fetchHandler = async(val) => {
    return  await axios.post('http://localhost:5000/getco',{
      batchidcidatype : val
    })
   }
   
   const fetchCoPercentage = async(val) => {
    return  await axios.post('http://localhost:5000/copercent',{
      batchidcidatype : val
    })
   }
   useEffect(() => {
    fetchHandler(val).then((res) =>{
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

    fetchCoPercentage(val).then((res) =>{
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

   },[val])
  return (
    <>
     
  
    {show}
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


 

    </>
  )
}

export default EndSemCO
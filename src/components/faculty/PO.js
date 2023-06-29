import React,{useEffect, useState} from 'react'
import FacultyNav from './FacultyNav'
import axios from 'axios'
import '../../styles/faculty/PO.css'
import { Tooltip, BarChart,  Brush,Bar,CartesianGrid,YAxis,Legend,XAxis,ReferenceLine } from 'recharts';



const PO = () => {
    const[batchList, setBatchList] = useState([])
    const[bat,setBat] = useState('')
    const[courses,setCourses] = useState([])
    const[poa,setPoa] = useState([])
    const[courseForPoA, setCourseForPoA] = useState('')
    const[POATable,setPOATable] = useState(false)
    const[showCourses,setShowCourses] = useState(false)
const[showProcess,setShowProcess] = useState(false)
const[po1,setpo1] = useState('')
const[dlpoa, setdlpoa] = useState([])
const[madpoa, setmadpoa] = useState([])
const[avg1,setavg1] = useState(0)
const[avg2,setavg2] = useState(0)
const[avg3,setavg3] = useState(0)
const[avg4,setavg4] = useState(0)
const[avg5,setavg5] = useState(0)
const[avg6,setavg6] = useState(0)
const[avg7,setavg7] = useState(0)
const[avg8,setavg8] = useState(0)
const[avg9,setavg9] = useState(0)
const[avg10,setavg10] = useState(0)

const[showavg,setshowavg] = useState(false)
    // useEffect(() => {
    //   // Update the data array whenever poa state changes
    //   setData([
    //     { name: 'PO1', value: poa[0] },
    //     { name: 'PO2', value: poa[1] },
    //     { name: 'PO3', value: poa[2] },
    //     { name: 'PO4', value: poa[3] },
    //     { name: 'PO5', value: poa[4] },
    //     { name: 'PO6', value: poa[5] },
    //     { name: 'PO7', value: poa[6] },
    //     { name: 'PO8', value: poa[7] },
    //     { name: 'PO9', value: poa[8] },
    //     { name: 'PO10', value: poa[9] },
    //   ]);
    // }, [poa]);

    const fetchHandler  = async() => {
        return await axios.get("http://localhost:5000/batcheslist").then((res) => res.data)
      }

    useEffect(() => {
        console.log('hi')
        fetchHandler().then(data => setBatchList(data.collections))
      },[])

    //   useEffect(async(req, res) => {
      
    // },[batch])

      const handleNext = async(event) => {
        setShowCourses(!showCourses)
        setPOATable(false)
        setshowavg(false)
        setShowProcess(false)
        setBat(event.target.value)
  console.log('batch',bat)

    await axios.post('http://localhost:5000/getallcourses',{
        programmeName : "MCA"
    }).then(res => setCourses(res.data));
    console.log(courses)
      }

const generatePO = async(event,req,res) => {
    // to check if co percentage is present with 1,2,e
    console.log('hey',event.target.value)
    setPOATable(true)
    var b = bat+event.target.value;
  setCourseForPoA(event.target.value)
  
  console.log('k',courseForPoA)
    console.log('batchidcid',b)
    await axios.post('http://localhost:5000/checkoa',{
      batchidcid : b
    }).then(async(res) => {
      if(res.data == 'Number of matching docs: 3'){
        // calculate oa
        setShowProcess(false)
        return await axios.post('http://localhost:5000/oa',{
          batchidcid : b
        }).then(res =>{
          if(event.target.value=='Deep Learning'){
            setdlpoa(res.data)
            console.log('heyy')
          }
          else if(event.target.value=='Mobile Application Development'){
            setmadpoa(res.data)
            console.log('mad')
          }
          else{
          setPoa(res.data)
          setpo1(poa[0])
          }
        } )
       
      }
      else{
        setShowProcess(true)
        setPOATable(false)
      }
    });
    console.log('poa',poa)
    
    console.log('po1',po1)

   
}
const data = [
  {name : 'PO1',value: poa[0]},
  {name : 'PO2',value: poa[1]},
  {name : 'PO3',value: poa[2]},
  {name : 'PO4',value: poa[3]},
  {name : 'PO5',value: poa[4]},
  {name : 'PO6',value: poa[5]},
  {name : 'PO7',value: poa[6]},
  {name : 'PO8',value: poa[7]},
  {name : 'PO9',value: poa[8]},
  {name : 'PO10',value: poa[9]},
  
]
const handlePOABatch = () => {
setshowavg(true)
setavg1(((parseFloat(poa[0])+parseFloat(dlpoa[0]) + parseFloat(madpoa[0]))/3).toFixed(3));
setavg2(((parseFloat(poa[1])+parseFloat(dlpoa[1])+ parseFloat(madpoa[1]))/3).toFixed(3));
setavg3(((parseFloat(poa[2])+parseFloat(dlpoa[2])+ parseFloat(madpoa[2]))/3).toFixed(3));
setavg4(((parseFloat(poa[3])+parseFloat(dlpoa[3])+ parseFloat(madpoa[3]))/3).toFixed(3));
setavg5(((parseFloat(poa[4])+parseFloat(dlpoa[4])+ parseFloat(madpoa[4]))/3).toFixed(3));
setavg6(((parseFloat(poa[5])+parseFloat(dlpoa[5])+ parseFloat(madpoa[5]))/3).toFixed(3));
setavg7(((parseFloat(poa[6])+parseFloat(dlpoa[6])+ parseFloat(madpoa[6]))/3).toFixed(3));
setavg8(((parseFloat(poa[7])+parseFloat(dlpoa[7])+ parseFloat(madpoa[7]))/3).toFixed(3));
setavg9(((parseFloat(poa[8])+parseFloat(dlpoa[8])+ parseFloat(madpoa[8]))/3).toFixed(3));
setavg10(((parseFloat(poa[9])+parseFloat(dlpoa[9])+ parseFloat(madpoa[9]))/3).toFixed(3));

console.log('avg1',avg1)
}
  return (
    <>
    <FacultyNav/>
    <p id="headingpo">Select Batch to calculate PO</p>

    <div className='bodyP'>  
        {
          batchList.map((batch,i) => (
            // console.log(batch)
            <div key={i} className='bcard'>
              {batch}
              <button onClick={handleNext} className='button' value={batch} >Next</button>
              </div>

          ))
        }
    </div>
{ showCourses &&
    <div className='bodyPO'>
 {/* display courses in a batch from course curriculum */}
 <table className='coursetable'>
    <thead>
        <tr>
            <td><b><h3>Courses</h3></b></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
{
    courses.map((course,i) => (
       <tr key={i}>
        <td>
        {course.courseName}
        </td>
        <td>
            <button className='button' onClick={generatePO} value={course.courseName}>Generate PO</button>
        </td>

        </tr>
    ))
}
    </tbody>
 </table>
 </div>
}
{
  showProcess && <h3><center>Under Process !</center></h3>
}

 { POATable &&
  <>
 <p id="headingpo">Overall PO Attainment</p>
 <div className='bodyPO'>
 
<table className='poatable'>
  <tr>
    <td>

    </td>
    <td>PO1</td>
    <td>PO2</td>
    <td>PO3</td>
    <td>PO4</td>
    <td>PO5</td>
    <td>PO6</td>
    <td>PO7</td>
    <td>PO8</td>
    <td>PO9</td>
    <td>PO10</td>
    
  </tr>
  

     <tr>
      <td id="cnamepoa">Deep Learning</td>
      {
        dlpoa.map((i,k) => (
          <td key={k}>
            {i}
          </td>
        ))
      }
     </tr>
     <tr>
  <td id="cnamepoa">Ethical Hacking</td>
  {
    poa.map((i,k) => (
      <td key={k}>
{
  i
}
</td>
    
    ))
  }
     </tr>

     <tr>
      <td>Mobile Application Development</td>
      {
    madpoa.map((i,k) => (
      <td key={k}>
{
  i
}
</td>
    
    ))
  }
     </tr>
</table>
<button className='button' onClick={handlePOABatch} style={{textAlign: 'center'}}>POA for batch</button>

</div>

</>
 }


{
  showavg &&
 <>
  <p id="headingpo">Overall PO Attainment Of Batch</p>
  <div className='bodyPO'>
  <table className='poatable'>
  <tr>
    <td>

    </td>
    <td>PO1</td>
    <td>PO2</td>
    <td>PO3</td>
    <td>PO4</td>
    <td>PO5</td>
    <td>PO6</td>
    <td>PO7</td>
    <td>PO8</td>
    <td>PO9</td>
    <td>PO10</td>
    
  </tr>
  <tr>
    <td></td>
    <td>{avg1}</td>
    <td>{avg2}</td>
    <td>{avg3}</td>
    <td>{avg4}</td>
    <td>{avg5}</td>
    <td>{avg6}</td>
    <td>{avg7}</td>
    <td>{avg8}</td>
    <td>{avg9}</td>
    <td>{avg10}</td>
    
  </tr>
  </table>
  </div>
  </>
}

{/* <BarChart
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
          <YAxis domain={[0, 3]}/>
          <Tooltip />
          <Legend />
          
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="PO Attainment" fill="#106470" background={{ fill: '#eee' }} />
          <ReferenceLine y={60} stroke="red" strokeWidth={2} label="Target" />
         
        </BarChart> */}


 </>

  
  )
}

export default PO
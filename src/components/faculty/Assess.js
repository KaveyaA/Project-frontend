// import React,{useState} from 'react'

// const Assess = () => {
// const[no,setNo] = useState(10)
// const[section,setSection] = useState('Section A')
// const[option, setOption] = useState(true)

// const[question, setQuestion] = useState({
//     qNo:'',
//     qText:'',
//     marks : '',
//     co:'',
//     bl : '',
// })
// const[allQuestions, setAllQuestions] = useState([])

// const handleChange= (e) => {
//   const {name, value} = e.target;
//   setQuestion(( prevState ) => ({
//       ...prevState,
//       [name] : value
//   }));
  
// };

// const handleSubmit = (e) => {

//   e.preventDefault();
 

//   const newQuestion = { ...question};
//   setAllQuestions(( prevAllQuestions ) =>  
//   [...prevAllQuestions, newQuestion] 
//   );
// setQuestion({
  
//     qNo:'',
//     qText:'',
//     marks : '',
//     co:'',
//     bl : '',
// })
// setNo(no-1);
// if(no == 4){
//   setSection('Section B')
//   setOption(true)
// }
// else if(no== 2){
//   setSection('Section C')
// }

// }

// const handleAllQuestions = () => {
//     console.log(allQuestions);
//     // console.log(CoQpMapping)
//     // axios.post('http://localhost:5000/addcoqpmapping',{
//     //     ...CoQpMapping,
//     // }).then(() => alert('done'))
//     // setAllQuestions([]);
//   }
//   return (
//     <div>
//          <p id="qpheading" >Enter question paper details:</p>
//          {   <p> {no}Remaining</p>}
//          {section}
//          {option }
//          <form onSubmit={handleSubmit}>
//      <table>

//       <thead>
//         <tr>
//          <td> Question No</td>
//          <td>Question</td>
//          <td>Marks</td>
//          <td>CO</td>
//          <td>BL Taxonomy</td>
//         </tr>
//       </thead>

//       <tbody>
//         <tr>
// <td>
// <input type='text' name="qNo" value={question.qNo}
//                 onChange={handleChange}/>
// </td>
// <td>
// <input type='text' name="qText" value={question.qText}
//                 onChange={handleChange}/>
// </td>

// <td>
// <input type='text' name="marks" value={question.marks}
//                 onChange={handleChange}/>
// </td>
// <td>
// <select name="co" value={question.co}
//                 onChange={handleChange}>
//             <option></option>
//             <option>CO1</option>
//             <option>CO2</option>
//             <option>CO3</option>
//             <option>CO4</option>
//             <option>CO5</option>
//             <option>CO6</option>
//         </select>
// </td>
// <td>
// <select name="bl" value={question.bl}
//                 onChange={handleChange}>
//             <option></option>
//             <option>L1</option>
//             <option>L2</option>
//             <option>L3</option>
//             <option>L4</option>
//             <option>L5</option>
//             <option>L5</option>
//             </select>
// </td>
//         </tr>
//       </tbody>
//      </table>
//               <button type ="submit" className='button'>Next</button>
//                 </form>
//                 <button onClick={handleAllQuestions}>Confirm template</button>
              
            
//     </div>
//   )
// }

// export default Assess
// import React,{useState} from 'react'

// const Assess = () => {
//   const[no,setNo] = useState(1);
//   const[section,setSection] = useState("Section A")
//   const[question, setQuestion] = useState({
//         qNo:no,
//         qText:'',
//         marks : '',
//         co:'',
//         bl : '',
//     })
//   const handleNext = () => {
//     setNo(no+1)
//   }
//   return (
//     <>
//     <h1>Question paper Template</h1>
//     <h2>{section}</h2>
// <label>Question {no}</label>
// <input type='text' name="qNo" value={question.qNo}
//                  onChange={handleChange}/>
// <button onClick={handleNext}>Next</button>
//     </>
//   )
// }

// export default Assess
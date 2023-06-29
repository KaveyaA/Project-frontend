import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Home from './components/main/Home';
import NBA from './components/main/NBA';
import About from './components/main/About';
import LoginPage from './components/main/LoginPage';
import AdminHome from './components/admin/AdminHome';
import FacultyHome from './components/faculty/FacultyHome';
import AddBatch from './components/admin/AddBatch';
import AddFaculty from './components/admin/AddFaculty';
import ViewBatches from './components/admin/ViewBatches';
import ViewFaculties from './components/admin/ViewFaculties';
import CourseAllocations from './components/admin/CourseAllocations';
import CourseCurriculum from './components/main/CourseCurriculum';
import Header from './components/Header';
import QuestionBank from './components/main/QuestionBank';
import UpdateCourseCurriculum from './components/admin/UpdateCourseCurriculum';
import InputMarks from './components/faculty/InputMarks';
import FacultyCourses from './components/faculty/FacultyCourses';
import QuestionPaperTemplate from './components/faculty/QuestionPaperTemplate';
import Assess from './components/faculty/Assess';

import ViewBatchPerformance from './components/faculty/ViewBatchPerformance';
import PO from './components/faculty/PO';
import COAnalytics from './components/faculty/COAnalytics';

function App() {
  return (
    <React.Fragment>
      <Header/>

      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path = '/nba' element = {<NBA/>}/>
        <Route path = '/about' element = {<About/>}/>
        <Route path = '/login' element = {<LoginPage/>}/>
        <Route path = '/adminhome' element = {<AdminHome/>}/>
        <Route path = '/facultyhome' element = {<FacultyHome/>}/>

        
        <Route path='/addbatch' element = {<AddBatch/>}/>
        <Route path='/addfaculty' element = {<AddFaculty/>}/>
        <Route path='/viewbatches' element = {<ViewBatches/>}/>
        <Route path='/viewfaculties' element = {<ViewFaculties/>}/>
        <Route path='/courseallocation' element = {<CourseAllocations/>}/>
        <Route path='/coursecurriculum' element = {<CourseCurriculum/>}/>
        <Route path='/questionbank' element = {<QuestionBank/>}/>
        <Route path='/updatecc' element = {<UpdateCourseCurriculum/>}/>
        
        <Route path='/mycourses' element = {<FacultyCourses/>}/>
        <Route path='/generateqp' element = {<QuestionPaperTemplate/>}/>
        <Route path='/inputmarks' element = {<InputMarks/>}/>
        <Route path='/performance/:value' element = {<ViewBatchPerformance/>}/>
        <Route path='/po' element = {<PO/>}/>
        <Route path='/coanalytics' element={<COAnalytics/>}/>
       
       
    </Routes>
    </React.Fragment>
  );
}

export default App;

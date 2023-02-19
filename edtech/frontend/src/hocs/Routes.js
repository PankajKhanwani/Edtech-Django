import React, { useEffect, useState } from "react";
import { Routes ,Route, useNavigate } from 'react-router-dom';


import HomeSection from "../components/HomeSection";
import Overview from "../components/Overview";
import Attendence from "../components/Attendence";
import Sidebar from "../components/Sidebar";
import Layout from "./Layout";
import HostPage from "../components/HostPage";
import Live from "../Live";
import LiveApp from "../LiveApp";
import Assignments from "../components/Assignments";
import { AssignmentSubmit } from "../components/AssignmentSubmit";
import StudyMaterial from "../components/StudyMaterial";
import Announcements from "../components/Announcements";




const Routt=()=>{
    return (
        <> 
        <div className="flex">
        
        <Sidebar/>
            <Routes>
                <Route path="/attendence" element={<Attendence/>}/>
                <Route path="/overview/*" element={<Overview/>}/> 
                <Route path="/assignments" element={<Assignments/>}/>  
                <Route path="/assignments/*" element={<AssignmentSubmit/>}/>  
                <Route path="/studymaterial" element={<StudyMaterial/>}/>
                <Route path="/announcements" element={<Announcements/>}/>
                             
            </Routes>

        </div>    
        </>
    )
}

export const HomeRoute=()=>{
    let navigate = useNavigate()
    let [isAuth,setAuth] = useState(localStorage.getItem("isAuthenticated"))
    useEffect(()=>{
        setAuth(localStorage.getItem("isAuthenticated"))
        if (isAuth==null){
            navigate("/login")
        }
    },)
    return(
        <>
        
            <Layout/>
            <Routes>
                <Route exact path='/' element={<HomeSection/>}/>
                <Route exact path='/home' element={<HomeSection/>}/>
                <Route path="/live" element={<LiveApp/>}/>  
                <Route exact path='*' element={<Routt/>}/>   
            </Routes>
        
        </>
    )
}

export default Routt;
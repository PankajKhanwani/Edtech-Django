import React, { useEffect, useState } from "react";
import { Routes ,Route, useNavigate } from 'react-router-dom';


import HomeSection from "../components/HomeSection";
import Overview from "../components/Overview";
import Attendence from "../components/Attendence";
import Sidebar from "../components/Sidebar";
import Layout from "./Layout";
import HostPage from "../components/HostPage";
import Live from "../Live";




const Routt=()=>{
    return (
        <> 
        <div className="flex">
        {/* <Layout> */}
        
        <Sidebar/>
            <Routes>
                <Route path="/attendence" element={<Attendence/>}/>
                <Route path="/overview/*" element={<Overview/>}/>  
                <Route path="/test" element={<Live/>}/>               
            </Routes>
        {/* </Layout>    */}
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
                <Route exact path='*' element={<Routt/>}/>   
            </Routes>
        
        </>
    )
}

export default Routt;
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './hocs/Layout';
import  Routt, { HomeRoute }  from './hocs/Routes';
import Sidebar from './components/Sidebar';
import { useEffect, useState } from 'react';
import HomeSection from './components/HomeSection';
import Login from './components/Login'





function App() {
    // localStorage.removeItem("isAuthenticated")
    // let [isAuth,setAuth] = useState(localStorage.getItem("isAuthenticated"))
    // useEffect(()=>{
    //     setAuth(localStorage.getItem("isAuthenticated"))
    //     console.log(isAuth)
    //     console.log(localStorage.getItem("student_id"))
    // },[isAuth])

  return (
    <div className="App">
        
           <BrowserRouter>
                <Routes>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='*' element={<HomeRoute/>}/>  
                </Routes>    
            </BrowserRouter>        
    </div>
  );
}

export default App;

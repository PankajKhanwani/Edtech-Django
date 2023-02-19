import styled from "styled-components"
import axios from "axios"
import { useState } from "react"
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Page(){
    let ele=document.querySelector("#anchorCreate")   
    let ele2=document.querySelector("#signup")
    let eleSignIn=document.querySelector("#SignIn")
    if(ele.innerHTML=="Create"){
        document.querySelectorAll('.signupInput').forEach(element => {element.style.display='block'});
        ele.innerHTML="Login"
        ele2.innerHTML="Already have an account?"
        eleSignIn.innerHTML="Create Account"
        // document.querySelector('#main').setAttribute('action','http://127.0.0.1:8000/firstapp/signup')
        document.querySelector('#Login').innerHTML='Signup'
        document.querySelector('#Login').name='signup'
        document.querySelector('#rememberme').style.display='none';
    }
    else {
        document.querySelectorAll('.signupInput').forEach(element => {element.style.display='none'});
        ele.innerHTML="Create"
        ele2.innerHTML="Don't Have an account?"
        eleSignIn.innerHTML="Sign In"
        // document.querySelector('#main').setAttribute('action','http://127.0.0.1:8000/firstapp/login');
        document.querySelector('#Login').innerHTML='Login'
        document.querySelector('#Login').name='login'
        document.querySelector('#rememberme').style.display='flex';
    }
}

export default function Login(props){  
    const navigate = useNavigate();  
    let [cred,setCred] = useState({
        name : "",
        password : "",
        repeatpassword : "",
        email : "",
        phonenumber : "",
        rememberMe : "",
        address: "",
        dob:"",
       
    })  
    
    async function handleClick(event){
        event.preventDefault()
        var bodyFormData = new FormData()
        console.log(event.target.name)
         
        if (event.target.name == "login"){
            bodyFormData.append('email',cred['email']);
            bodyFormData.append('password',cred['password']);
           
            let isAuthenticated = await axios.post('http://127.0.0.1:8000/edtech/login',bodyFormData) 
            .then((res)=>{
                console.log(res.data['status'])
                if (res.data['status'] == "success"){
                    localStorage.setItem('isAuthenticated', true)
                    localStorage.setItem('student_id', res.data['student_id'])
                    navigate("/home");   
                }
                else{
                    localStorage.setItem('isAuthenticated', false)
                }
            })
            .catch(error=>{
                console.log('err')
                console.log(error.response.data.error)
            })     
        } 
        if (event.target.name == "signup"){
            
            console.log('hi')
            // bodyFormData.append('password',cred['password']);
           
            let isAuthenticated = await axios.post('http://127.0.0.1:8000/edtech/student',cred) 
            .then((res)=>{
                console.log(res)
                localStorage.setItem('isAuthenticated', true)
                localStorage.setItem('student_id', res.data)
                navigate("/home");
    
            })
            .catch(error=>{
                console.log('err')
                console.log(error.response.data)
            })     
        } 
        
    }    
    
        

    function handleChange(event){
        
        setCred({
            ...cred,
            [event.target.name]:event.target.value
        })
    }

        return<>
            <Form id='main' className="flex mx-auto">
                <span id="SignIn" style={{fontSize:"2rem"}}>Sign In </span>
                <div className='input-icons'>
                    {/* <i className="fa-regular fa-user"></i> */}
                    <input className="signupInput"type='text' value={cred['name']} onChange={handleChange} id='name' placeholder="NAME" name="name" autoCapitalize="none"></input> 

                    <input className='loginInput' type='email' value={cred['email']} onChange={handleChange}  id='email' placeholder="EMAIL" name='email' autoCapitalize="none"></input>
                    {/* <i className="fa-solid fa-lock"></i> */}
                    <input className='loginInput' type='password' value={cred['password']} onChange={handleChange}  id='password' placeholder="PASSWORD" name='password' autoComplete="off" autoCapitalize="none"></input>

                    <input className="signupInput" type='password' value={cred['repeatpassword']} onChange={handleChange}  id='repeatpassword' placeholder="REPEAT PASSWORD" name='repeatpassword' autoComplete="off" autoCapitalize="none"></input>
                    
                    <input className="signupInput" type='text' value={cred['address']} onChange={handleChange} id='address' placeholder="ADDRESS" name='address' autoCapitalize="none"></input>

                    <input className="signupInput" type='tel' value={cred['phonenumber']} onChange={handleChange}  pattern="[6-9]{1}[0-9]{9}" title="Please enter valid phone number" id='phonenumber' placeholder="PHONE NUMBER" name='phonenumber' autoCapitalize="none"></input>

                    <input className="signupInput" type="date" value={cred['dob']} onChange={handleChange} placeholder="Date Of Birth"  id='dob' name='dob' />
                </div> 

                <div id='rememberme'>
                    <span id='remdiv'>
                        <input type='checkbox' id='remember1' value={cred['rememberme']} onChange={handleChange}  className="smallcheck"></input>
                        <label id='labelremember' htmlFor='remember1'>Remember Me</label>
                    </span>
                    <a id='ForgotPasswordClick' href=''>Forgot Password?</a>
                </div>
                <span className="mt-2">
                    {props.err}
                </span>
                <button id='Login' name='login' onClick={handleClick}>Login</button>
                <span id="signup">
                    Don't have an account?
                </span>
                <a style={{cursor:"pointer"}}id="anchorCreate" onClick={()=>Page()}>Create</a>
                
            </Form>
        </>
}
const Form = styled.form` 
    width:80%;
   
    max-width: 500px;
    background-color: rgb(238, 232, 232);
    border-radius:20px;
    padding:3% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
#SignIn{
    color: rgb(60, 60, 60);
    padding: 10px;
    margin-bottom: 5%;
}
.signupInput{
    display: none;
}
.loginInput{
    display: block;
}
.loginInput ,.signupInput{
    box-sizing: border-box;
    width: 100%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border:0.1px solid grey;
    margin-bottom: 7%;
    border-radius: 0.6rem;
    font-size: 1.5rem;
    padding: 9px 10px 15px 40px;
}
.input-icons{
    width: 80%;  
}
.input-icons i {
    font-size: 0.8rem;
    position: absolute;
    padding: 22px 10px;
    min-width: 40px;
}
input::placeholder {
    color: rgba(0,0,0,0.4);
    opacity: 1;
    
    font-size: 1rem;
}

#rememberme{
    margin-top:0 ;
    display: flex;
    justify-content: space-between;
    width: 80%;
    align-items: center;     
}
#Login{
    margin-top:6% ;
    margin-bottom: 6%;
    padding:10px;
    transition: 0.2s all;
    cursor: pointer;
    border-radius: 0.6rem;
    background-color: #9B1003;
    color: white;
    border: none;
    font-size:1.5rem;
    width: 50%;
    box-shadow: 0px 0.5px;
    -webkit-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
    -moz-box-shadow: 5px 5px 15px rgba(0,0,0,0.4);
}
#ForgotPasswordClick,#signup,label{
    
    color:grey;
    text-decoration: none;
}
#anchorCreate{
    margin: 5px;
    color: #B90E0A;
    text-decoration: none;
}

    /* width:auto ;
    max-width: 700px;
    margin: 20px;
    overflow: auto;
    border: 2px solid black;
    padding: auto;
    background-color: rgb(238, 232, 232);
    border-radius:20px;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

#remdiv{
    font-size: 0.8rem;
    display: flex;
    align-items:center;
    color:grey;
}
input.smallcheck{
    width: .8rem;
    height: .8rem;
}  
/*  */
`
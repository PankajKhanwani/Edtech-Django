import React, { useState } from "react";
import Select from "../Select/Select";
import { useHMSActions} 
         from '@100mslive/hms-video-react';
import getToken from "../../utils/getToken";
import { useEffect } from "react";
import axios from "axios";



  const JoinForm = ({handleStart}) => {

  const hmsActions = useHMSActions();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState('');

  async function getUser(){
    var bodyFormData = new FormData()

    bodyFormData.append('student_id',localStorage.getItem('student_id'))
    bodyFormData.append('batch_id',localStorage.getItem('batch_id'))
    await axios.post('http://127.0.0.1:8000/edtech/liveData',bodyFormData)
    .then((res)=>{
        console.log(res.data)
        setUserName(res.data['name'])
        res.data['role']=='student'?setRole('viewer'):setRole('stage')
        
    })
 }

  useEffect(()=>{
    getUser()
  },[])
  
 

  const joinRoom = () => {
    // Join form
    getToken(role).then((token) => {
        console.log(token)
    	hmsActions.join({
    		userName: userName || 'Anonymous',
    		authToken: token,
    		settings: {
    			isAudioMuted: true,
    		},
    	});
    }).catch((error) => {
    	console.log('Token API Error', error);
    });
  };

//   const newLocal = role ? joinRoom() : null;

  return (
    <div className="w-screen flex items-center justify-center " style={{height:'80vh'}}>
      <div className="w-64 h-32 p-4 rounded-lg">
        <form
           onSubmit={(e) => {
             e.preventDefault();
          }}
        >
          <input
            value={userName}
            onChange={(e) => setUserName(userName)}
            name="userName"
            className="shadow appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            placeholder="Name"
            required
          />
           <Select state={{ role, setRole }} />
          <button 
          onClick={joinRoom} 
          className="px-4 py-2 bg-blue-700 rounded-lg text-white">
            Join Live Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
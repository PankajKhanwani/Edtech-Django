import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import AssignmentSection from "./AssignmentSection";


export default function Assignments(){
    var bodyFormData = new FormData()
    
    bodyFormData.append("student_id",localStorage.getItem("student_id"));
    bodyFormData.append("batch_id",localStorage.getItem("batch_id"));
    let [response,setResponse] = useState([])
   
    useEffect(()=>{
        
        async function getData(){
            let result = await axios.post('http://127.0.0.1:8000/edtech/assignments',bodyFormData)  
            let res = result.data["Assignments"]
            setResponse(res)
            
        }
        getData()
    },[])
        
    function Data(){
        return response.map((ele)=>{
            return <AssignmentSection item={ele} key={ele['id']}/>
        })
    }

    return <>
        <div className="w-screen">
          <Data/>
        </div>
    </>
}
import { useEffect, useState } from "react";
import axios from "axios";


export default function Overview(props){
    var bodyFormData = new FormData()
    let [overview,setOverview]=useState([])
    async function getData(){
        
        bodyFormData.append("student_id",localStorage.getItem("student_id"))
        bodyFormData.append("batch_id",localStorage.getItem("batch_id"))
        // let res = await axios.post(`http://127.0.0.1:8000${window.location.pathname}`)
        let res = await axios.post("http://127.0.0.1:8000/edtech/Overview",bodyFormData)
        
        setOverview(res.data)
    }

    useEffect(()=>{
        getData()
    },[])
     
    return <>
    
        <div className=" w-7/12  mx-0 px-0">
            <span href="#" className="w-9/12 mx-auto my-12 h-48 block p-6 max-w-100 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{overview['desc']}</h5>
                    <div className="flex my-5">
                        <p className="font-normal mx-auto text-gray-700 dark:text-gray-400">Start Date : {overview['start_date']}</p>
                        <p className="font-normal mx-auto text-gray-700 dark:text-gray-400">Batch : {overview['batch_name']}</p>
                    </div>
            </span>
            {/* <span href="#" className="w-9/12 mx-auto my-12 h-48 block p-6 max-w-100 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Python Job Assurance Batch 1</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </span> */}
        </div>
    </>    
}
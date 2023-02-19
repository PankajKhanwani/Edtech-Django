import axios from "axios";
import { useEffect, useState } from "react";
import assignmenticon from "../images/assignmenticon.svg"
import SubmitData from "./SubmitData";

export function AssignmentSubmit(){
    var bodyFormData = new FormData()
    bodyFormData.append("student_id",localStorage.getItem("student_id"));
    let [response,setResponse] = useState([])
    let [file,setfile] = useState()
    let [status,setstatus]= useState("Submit Assignment")
   
    useEffect(()=>{

        async function getData(){
            let result = await axios.post(`http://127.0.0.1:8000/edtech${window.location.pathname}`,bodyFormData)  
            let res = result.data
            res['image'] = res["image"].split('/').pop()
            for(let i=0;i<res['submitImage'].length;i++){
                res['submitImage'][i]=res['submitImage'][i].split('/').pop()
            }
            setResponse(res)  
            
        }
        getData()
    },[])

    
    function handleChange(e){
        
        setfile(e.target.files[0])
    }

    function handleClick(){
        window.open(`http://127.0.0.1:8000/media/assignments/images/${response['image']}`)
    }

    async function submitAssignment(){
        var bodyFormData = new FormData()
        bodyFormData.append('batch_id',localStorage.getItem('batch_id'))
        bodyFormData.append("student_id",localStorage.getItem("student_id"))
        bodyFormData.append('image',file)
        let result = await axios.post(`http://127.0.0.1:8000/edtech${window.location.pathname}/submit`,bodyFormData)
        .then((res)=>{
            setstatus(res.data)
            window.location.reload();
        }) 
    }

    function resubmitAssignment(){
        setResponse({
            ...response,
            submitImage : null
    })
    }

    function Data(){
        
        return response['submitImage']? response['submitImage'].map((ele,index)=>{
            return <SubmitData item={ele} key={index}/>
        }):<></>
    }

    return <>
        <div className="w-7/12 h-full mx-5 px-0 ">   
            <span href="#" className="w-11/12 mx-auto mt-12 h-4/5 block max-w-100 bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="border-b-4 w-auto p-8 h-2/4">
                    <div className="border-b-2 pb-3 font-bold w-full flex ">
                        <p className="mr-auto"> {response["name"]} </p>
                        {response["status"]=="Submitted"?
                        <p className="text-green-600"> {response["status"]}</p>:
                        <p className="text-red-600"> {response["status"]}</p>}
                    </div>
                    <div className=" font-extralight w-full h-1/5 mt-2 flex align-items-center ">
                        <p> Deadline : {response["deadline"]}</p>
                    </div>
                    <div className="text-left">
                        <p>
                            Attachments
                        </p>
                        <div className="border w-44 max-w-2xl mt-3 rounded-lg cursor-pointer" onClick={handleClick} >
                            <div>
                            <img src={assignmenticon} className=" py-3 mx-auto w-2/5" />
                            </div>
                            <div className="text-xs border-t break-words shadow-md text-center p-2">
                                {response['image']}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-auto px-8 py-4 h-2/4">
                    <div className="border-b pb-2 font-bold w-full flex ">
                        <p className="mr-auto pt-2"> Your Answers: </p>
                        {file?
                        <p onClick={submitAssignment} id='submitButton' className="text-blue-700 cursor-pointer hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                            {status}
                        </p>:null}
                        {response['submitImage']?
                        <p onClick={resubmitAssignment} id='submitButton' className="text-blue-700 cursor-pointer hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">
                        Resubmit
                        </p>:null}
                    </div>
                    {!response['submitImage']?
                    <label htmlFor="fileUpload" className="mt-16 cursor-pointer px-56 py-3 text-base w-full hover:bg-gray-100 border-dotted border-2">
                        <input type="file"  id='fileUpload'className="" onChange={handleChange} name="myImage" accept="image/png, image/gif, image/jpeg" />
                    </label>:<></>
                    }
                    <div className="flex flex-wrap h-min">
                        <Data/>
                    </div>
                </div>
            </span>
        </div>
    </>
}
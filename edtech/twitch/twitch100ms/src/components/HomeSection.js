import styled from "styled-components"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SECTION from "./Section";
import axios from "axios";



export default function HomeSection(){
    var bodyFormData = new FormData()
    
    bodyFormData.append("student_id",localStorage.getItem("student_id"));
    const Data = () =>{
    let [response,setResponse] = useState([])
    useEffect(()=>{
        async function getData(){
            let result = await axios.post('http://127.0.0.1:8000/edtech/subscription',bodyFormData)  
            let res = result.data['info']
            setResponse(res)
        }
        getData()
    },[])
        return response.map((ele)=>{
            return <SECTION item={ele} key={ele['batch_id']}/>
        })
    }
    
    return <>
    <Search className="container mb-5 ">
    <form className="form-inline md-form form-xl " id='searchform'>
        <div className="d-flex align-items-center">
            <h5 id="searchbatch">BATCHES</h5>      
            <i className="fas fa-search mx-2" aria-hidden="true"></i>
            <input className="form-control form-control-xl ml-3 w-75" type="text" placeholder="Search" aria-label="Search"/>
            <input id="requestToJoin" className="btn btn-primary" type="button" value="Request To Joint"></input>
        </div> 
    </form> 
        
    </Search>   
    
    <SECTIONS className="section">
       <Data/>
        {/* <SECTION item={batch[0]}/>
        <SECTION item={batch[1]}/> */}
        {/* <div className="card mx-3 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">{batch[0].batchName}</h5>  
                <p className="card-text">{batch[0].desc}</p>
                <Link to="/Overview" className="btn btn-primary">Open</Link>
            </div>
        </div>    */}
        {/* <div className="card mx-3 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">Java</h5>  
                <p className="card-text">Java Job Assurance 2022 June</p>
                <a href="#" className="btn btn-primary">Open</a>
            </div>
        </div> 
        <div className="card mx-3 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">Frontend</h5>  
                <p className="card-text">Frontend Job Assurance 2022 June</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div> 
        <div className="card mx-3 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">Frontend</h5>  
                <p className="card-text">Frontend Job Assurance 2022 June</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>  */}
        {/* <div className="card mx-1 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>  
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>  */}
        {/* <div className="card mx-1 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">Card title</h5>  
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>   */}
        </SECTIONS>
        
    </>
}
let SECTIONS=styled.div`
    max-width: 75%;
    margin: auto;
    /* border: 5px solid green; */
    display: grid;
    grid: auto / auto auto auto auto;
    .card{
        box-shadow: 0px 1px;
        -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
        
    }
`
let Search=styled.div`
    max-width: 75%;
    margin-top: 5%;
    #searchbatch{
        margin-right: 4%;
        margin-left: 1%;
    }
    #requestToJoin{
        margin-left: 4%;
    }
    
`
// Git clone url Git remote -v (to check what is your remote origin) Git init git add remote origin originurl Git status Git diff filename Git diff Git add filename Git add foldername Git add . Git push origin branchname Git checkout -b branch name Git checkout branchname Git pull origin branchname
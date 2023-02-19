import { Link } from "react-router-dom";

export default function SECTION(props){

    return <>
        <div className="card mx-3 mb-2 py-5">
            <div className="card-body">
                <h5 className="card-title">{props.item['desc']}</h5>  
                <p className="card-text">{props.item['batch_name']}</p>
                <Link to={"/Overview"} onClick={()=>localStorage.setItem('batch_id', props.item['batch_id'])} className="btn btn-primary">Open</Link>
            </div>
        </div>   
    </>
}
import { useNavigate } from "react-router-dom";



export default function AssignmentSection(props){
    let navigate = useNavigate()
    const HandClickRender=(e)=>{  
        console.log(props.item['id'])
        navigate(`/assignments/${props.item['id']}`)
        
    
    }

    console.log(props.item)
    return <>
        <div className=" w-9/12  mx-0 px-0 cursor-pointer" onClick={HandClickRender}>
            <span href="#" className="w-9/12 mx-auto my-8 h-36 block p-6 max-w-100 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                    <div className="flex ">
                        <p className="font-bold mr-auto  text-gray-700 dark:text-gray-400"> {props.item['name']}</p>
                        <div className="font-bold text-gray-700 dark:text-gray-400">{props.item["status"]=="Submitted"?
                            <p className="text-green-600"> {props.item["status"]}</p>:
                            <p className="text-red-600"> {props.item["status"]}</p>}
                        </div>
                    </div>
                    <div className="mt-4 flex">
                        <p className="font-normal mr-auto text-gray-700 dark:text-gray-400">
                            <i className="fa-solid  fa-clock-rotate-left"></i>{" "}
                            {props.item["date_time"]}
                        </p>
                    </div>
            </span>
        </div>  
    </>
}

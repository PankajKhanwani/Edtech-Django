import assignmenticon from "../images/assignmenticon.svg"

export default function SubmitData(props){
    console.log(props.item)
    function handleClick(){
        window.open(`http://127.0.0.1:8000/media/assignments/images/${props.item}`)
    }

        
    return <>
        <div className="text-left mr-4 mt-2">
            <div className="border w-36 max-w-2xl mt-3 h-full rounded-lg cursor-pointer" onClick={handleClick} >
                <div>
                <img src={assignmenticon} className=" py-3 mx-auto w-2/5" />
                </div>
                <div className="text-xs break-words border-t text-center px-2 pt-1">
                    {props.item}
                </div>
            </div>
        </div>
    </>
}
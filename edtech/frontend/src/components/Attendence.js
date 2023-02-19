import { useEffect, useState } from "react";
import DPicker from "./Datepicker";
import axios from "axios";
import DatePicker from "react-datepicker";
import { PieChart } from 'react-minimal-pie-chart';
// import "react-datepicker/dist/react-datepicker.css";
// import "date-fns";


export default function Attendence(){
    var bodyFormData = new FormData()
    let [attendence,setAttendence]=useState([])
    const [startDate, setStartDate] = useState(new Date());

    async function getData(){
        // console.log(startDate.getFullYear())
        bodyFormData.append("student_id",localStorage.getItem("student_id"))
        bodyFormData.append("batch_id",localStorage.getItem("batch_id"))
        bodyFormData.append("month",startDate.getMonth()+1)
        bodyFormData.append("year",startDate.getFullYear())

        let res = await axios.post("http://127.0.0.1:8000/edtech/viewAttendence",bodyFormData)
        setAttendence(res.data)
       
    }

    useEffect(()=>{
        getData()
    },[startDate])
    

    const handleDateChange = (date) => {
        setStartDate(date);
      };

    return <>


        <div className="w-7/12  mx-5 px-0 ">   
            
            <span href="#" className="w-11/12 mx-auto mt-12 h-4/5 block p-6 max-w-100 bg-white shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="border-b-4 w-auto d-flex p-8 h-2/5">
                    <div className="w-2/4 h-full flex justify-center items-center border-r border-gray-200">
                        Overall Class Attended - {attendence['present']}<br/>
                        Total Classes for this batch - {attendence['classes']}<br/>
                        Absent for this batch - {attendence['classes']?attendence['classes']-attendence['present']:0}
                    </div>
                    <div className="w-2/4 h-full flex justify-center items-">
                            <PieChart
                                data={[
                                    { title: 'Attended', value: attendence['classes']?attendence['present']:100, color: '#32CD32' },
                                    { title: 'Absent', value:attendence['classes']?
                                    attendence['classes']-attendence['present']:0, color: '#C13C37' }, 
                                ]}
                                // label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
                            />
                    </div>
                </div>
            </span>
            
        </div>
        <div className="my-5">
        <DatePicker  
              showMonthYearPicker
              className="border border-2"
              selected={ startDate }  
              onChange={ setStartDate }  
              name="startDate"  
              dateFormat="MMMM yyyy" 
              open = {true}
              onKeyDown={(e)=>e.preventDefault()} 
          />  
            {/* <DPicker/> */}
        </div>
        
    </>

}
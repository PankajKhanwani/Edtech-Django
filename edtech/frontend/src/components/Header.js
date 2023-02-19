
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
export default function Header(){
    let navigate = useNavigate()
    return <>
    
    <NAV>
        <nav className=" py-3 navbar navbar-expand-lg bg-light">
            {/* <div className="container-fluid"> */}
                {/* <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="container-fluid" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="px-2">
                    <Link to='/home' className="nav-link active" aria-current="page" href="/">Batches</Link>
                    </li>
                    <li className="px-2">
                    <a className="nav-link active"aria-current="page" href="/">Timetable</a>
                    </li>
                    <li className="px-2">
                    <a className="nav-link active" aria-current="page"href="/">Reports</a>
                    </li>
                    <li className="px-2">
                    <a className="nav-link active" aria-current="page" href="/">Payments</a>
                    </li>
                    <li className="px-2">
                    <a className="nav-link active" aria-current="page" href="/">Chats</a>
                    </li>
                    <li className="px-2">
                    <a className="nav-link active" aria-current="page" href="/">Store</a>
                    </li>
                </ul>
                </div>
                <div>
                    <button className="btn mx-5" onClick={()=>{localStorage.clear(); 
                                                            navigate("/login")}}> Logout</button>
                </div>
            {/* </div> */}
        </nav>
        </NAV>
    </>

}

let NAV=styled.div`
    /*   */
    z-index: 10;
    box-shadow: 0px 1px;
    -webkit-box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
    
    
`
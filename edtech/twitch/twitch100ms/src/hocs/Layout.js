import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
// let arr = pathName.toString().split("/");


const Layout = (props) => {
	return (
		<>
			{/* <div className='container mt-5 mb-2'> */}
				<Header />
                
				
				
			{/* </div> */}
			{props.children}
		</>
	);
};


export default Layout;
import React from "react";
import JoinForm from "./components/Join/JoinForm";
import "./styles/styles.css";
import "./styles/tailwind.css"
import Room from "./components/Room/Room";
import {
  useHMSStore,
  selectIsConnectedToRoom
} from "@100mslive/hms-video-react";




const Live = () => {
  
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  console.log(isConnected)

  

  return (
      <div className="App">
        {isConnected ? <Room /> : <JoinForm /> }    
      </div>
  );
}
export default Live;

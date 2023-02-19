import React from "react";
import Screen from "../Video/Screen";
import VideoTile from "../Video/VideoTile";
import ControlBar from "../Control/ControlBar";
import ChatContainer from '../Chat/ChatContainer';
import Footer from "../Control/Footer";
import Header from "../Control/Header";
import {
  useHMSStore,
  selectLocalPeer,
  selectPeers
} from "@100mslive/hms-video-react";

const Room = () => {
    const localPeer = useHMSStore(selectLocalPeer);
    const isModerator = localPeer.roleName === "stage";
    const peers = useHMSStore(selectPeers);
    
  
     return (
      <div className="flex flex-row ">
            <div className="flex flex-wrap ">
                {
                isModerator ? 
                    (localPeer && < VideoTile peer={localPeer} isLocal={true}  /> )
                  :
                  (peers &&
                    peers
                      .filter((peer) => !peer.isLocal)
                      .map((peer) => {
                        return (
                          <>
                            <VideoTile isLocal={false} peer={peer} />
                          </>
                        );
                      }))
                } 
                      
        </div>
  
        <div className="  m-0 z10 self-center flex-wrap absolute top-0 left-0" style={{ width: 'calc(90vw - 100px)',height:'vh' }}>
        {
                isModerator ? 
                    null
                  :
                  (peers &&
                    peers
                      .filter((peer) => !peer.isLocal)
                      .map((peer) => {
                        return (
                          <>
                            <Screen isLocal={false} peer={peer}/>
                          </>
                        );
                      }))
                }     
        </div>
        <ChatContainer />
  
        
        {
          isModerator ? <ControlBar /> : <div></div>
        } 
        
        
      </div>
    );
  };
  
  export default Room;
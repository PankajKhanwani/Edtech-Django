import React from "react";
import ReactDOM from "react-dom";
import { HMSRoomProvider, HMSThemeProvider } from "@100mslive/hms-video-react";
import Live from "./Live";

const rootElement = ()=>{
    return<>
  <HMSRoomProvider>
    <HMSThemeProvider appBuilder={{ theme: "light" }}>
      <Live />
    </HMSThemeProvider>
  </HMSRoomProvider>,
  
  </>
};
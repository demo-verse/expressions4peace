import CalendarBox from "../components/CalendarBox";
import SpotifyPlaylist from "../components/artOfPeace/SpotifyPlaylist";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";

// import Drags from "../components/drags/Drags.js"

function DemoSpace() {
    return <div>
        {/* Hey there! Here's your calendar and playlist. */}
        {/* <Drags/> */}
        <SpotifyPlaylist/>
        <CalendarBox/>
    </div>
  }
  
  export default DemoSpace
  
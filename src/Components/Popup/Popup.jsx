import React, { useState } from "react";
// import Popuptemp from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

export default function Popup({title,msg,okFun}) {
    
   const handleOkClick = ()=>{
    okFun();
   }
  return (
    // <div style={{display: display?"absolute":'none'}}>
 <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#31313194",
        
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "300px",
        //   height: "200px",
          maxWidth: "auto",
          minWidth: "auto",
          padding: "8px 16px",
          borderRadius: "10px",
          position:'relative'
        }}
      >
        <h5 style={{ color: "black", textAlign: "center" }}>{title}</h5>
        <p style={{ color: "#4B4D4D" }}>
         {msg}
        </p>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={handleOkClick}>Ok</button>
        </div>
      </div>
    </div>
    // </div>
   
  );
}

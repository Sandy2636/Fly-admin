import React from "react";

export default function Language() {
  return (
    <div>
      <div style={{ background: "#2B2D3A", width: "100%", padding:'8px 16px',borderRadius:'10px'}}>
        <p>Change Language</p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
           
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              width:'10rem',
              margin:'0px 8px 16px 0px',
              padding:'8px 16px'
            }}
          >
            English
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              width:'10rem',
              margin:'0px 8px 16px 0px',
              padding:'8px 16px'
            }}
          >
            हिंदी
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              width:'10rem',
              margin:'0px 8px 16px 0px',
              padding:'8px 16px'
            }}
          >
            தமிழ்
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              width:'10rem',
              margin:'0px 8px 16px 0px',
              padding:'8px 16px'
            }}
          >
            मराठी
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: "black",
              textAlign: "center",
              width:'10rem',
              margin:'0px 8px 16px 0px',
              padding:'8px 16px'
            }}
          >
            ગુજરાતી
          </div>
        </div>
      </div>
    </div>
  );
}

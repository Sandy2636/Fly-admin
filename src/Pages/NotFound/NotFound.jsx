import React from "react";
import { useNavigate, } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const goBackClick = () => {
    navigate(-1);
  };
  const backToDashboardClick = () => {
      navigate('/')
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "grey" }}>404</h1>
        <h4>Sorry we couldn't find this page.</h4>
        <h6>
          But dont worry, you can find plenty of other things on our homepage.
        </h6>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={{color:"#735cff" ,border:"none",background:"none", marginRight:"10px"}} onClick={goBackClick}>&#8592; Go Back</button>
          <button style={{backgroundColor:"#735cff" ,color:'white',border:'none',borderRadius:'7px'}} onClick={backToDashboardClick}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}

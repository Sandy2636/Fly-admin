import React from "react";
import logo from "../../Assets/Logo.png";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import './Login.css'
export default function Login() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{}}>
        <div style={{marginBottom:'10px'}}>
          <img
            style={{ display: "block", margin: "auto", width: "150px" }}
            src={logo}
            alt=""
          />
        </div>
        <form action="">
          <div className="fromDiv" style={{backgroundColor:'whitesmoke', padding:'10px 20px',borderRadius:'15px'}}>
            <label htmlFor="username">UserName</label>
            <br />
            <div className="inputBox">
              <span>{<FaUser />}</span> <input type="text" id="username" />
            </div>
            <label htmlFor="password">Password</label>
            <br />
            <div className="inputBox">
              <span>{<FaKey />}</span> <input type="text" id="password" />
            </div>
            <label htmlFor="">Enter Captcha</label>
            <p style={{color:'green',textAlign:'center',backgroundColor:'white', borderRadius:'10px',padding:'10px'}}>1234</p>
            <div className="inputBox">
              <input type="text" id="password" />
              <span>{<LuRefreshCcw />}</span>
            </div>
            <button type="submit">LOGIN</button>
            <p style={{ color: '#414141'}}>Forgot password?</p>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import logo from "../../Assets/Logo.png";
import { FaUser, FaKey } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import axios from "axios";
import "./Login.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Popup from "../../Components/Popup/Popup";
import sha256 from "sha256";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [popUpShow, setPopUpShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captcha !== userCaptcha) {
      showErrorPopup("Wrong Captcha");
      return;
    }

    try {
      const response = await axios.post("/auth/login", {
        username,
        password: sha256(password),
      });

      storeUserCredentials(response.data);
      navigate("/");
    } catch (error) {
      handleLoginError();
    }
  };

  const showErrorPopup = (message) => {
    setMsg(message);
    setTitle("Error");
    setPopUpShow(true);
  };

  const handleLoginError = () => {
    setPassword("");
    setUsername("");
    setUserCaptcha("");
    generateCaptcha();
    showErrorPopup("Login Fail");
  };

  const storeUserCredentials = (userData) => {
    localStorage.setItem("userName", userData.username);
    localStorage.setItem("_id", userData._id);
    localStorage.setItem("user_type", userData.user_type);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("isUserLoggedIn", true);
    Cookies.set("jwtToken", userData.accessToken, {
      expires: 7,
      secure: true,
      sameSite: "None",
    });
  };

  const generateCaptcha = () => {
    const characters = "0123456789";
    let captcha = "";

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters.charAt(randomIndex);
    }
    setCaptcha(captcha);
  };

  const okFun = () => {
    setPopUpShow(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ marginBottom: "35px" }}>
          <img
            style={{ display: "block", margin: "auto", width: "150px" }}
            src={logo}
            alt=""
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div
            className="fromDiv"
            style={{
              backgroundColor: "whitesmoke",
              padding: "10px 20px",
              borderRadius: "15px",
            }}
          >
            <label htmlFor="username">UserName</label>
            <br />
            <div className="inputBox">
              <span style={{ marginRight: "10px" }}>{<FaUser />}</span>{" "}
              <input
                className="loginInputs"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <label htmlFor="password">Password</label>
            <br />
            <div className="inputBox">
              <span style={{ marginRight: "10px" }}>{<FaKey />}</span>{" "}
              <input
                 className="loginInputs"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <label htmlFor="captcha">Enter Captcha</label>
            <p
              style={{
                color: "green",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              {captcha}
            </p>
            <div className="inputBox">
              <input
                 className="loginInputs"
                style={{ textAlign: "center" }}
                type="text"
                id="captcha"
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
                required
              />
              <span onClick={generateCaptcha}>{<LuRefreshCcw />}</span>
            </div>
            <button type="submit">LOGIN</button>
            <p
              style={{
                color: "#414141",
                textAlign: "right",
                fontSize: "13px",
                marginTop: "5px",
              }}
            >
              Forgot password?
            </p>
          </div>
        </form>
      </div>
      {popUpShow && <Popup okFun={okFun} msg={msg} title={title} />}
    </div>
  );
};

export default Login;

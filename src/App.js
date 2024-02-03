import logo from "./logo.svg";
import "./app.scss";
import Routes from "./Routes";
import axios from "./authAxios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const [token, setToken] = useState(Cookies.get("jwtToken"));
  const navigate = useNavigate();
  useEffect(() => {
    setToken(Cookies.get("jwtToken"));
    console.log("Token  => ", token, "Cookie =>", Cookies.get("jwtToken"));
  }, [Cookies.get("jwtToken")]);
  console.log(token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        navigate("/login");
        // return Promise.reject("Unauthorized");
      } else if (error.response && error.response.status === 403) {
        navigate("/login");
        // return Promise.reject("Token Expired");
      }
    }
  );

  return <Routes />;
}

export default App;

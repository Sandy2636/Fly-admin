import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateUser.css";
import axios from "../../authAxios";
import sha256 from "sha256";
import Swal from "sweetalert2";
export default function CreateUser() {
  const [username, setUserName] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [fix_limit, setfix_limit] = useState("");
  const [my_match_share, setmy_match_share] = useState("");
  const [other_match_share, setother_match_share] = useState("");
  const [match_commission, setmatch_commission] = useState("");
  const [session_commission, setsession_commission] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [parent_match_share, setparent_match_share] = useState();
  // const [, set] = useState(second)
  // const [user_type, setuseType] = useState("");
  const [parent_id, setparent_id] = useState(localStorage.getItem("userName"));
  const { user_type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/users/get-user/", { params: { username: parent_id } })
      .then((res) => {
        setparent_match_share(res.data.user.my_match_share);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("other match share", other_match_share);
    console.log("my match share", my_match_share);
    if (password == confirmPassword) {
      axios
        .post("/users/add-user", {
          username,
          password: sha256(password),
          credits: "0",
          user_type: user_type.replace(/-/g, "_"),
          first_name,
          last_name,
          fix_limit,
          parent_id,
          my_match_share,
          match_commission,
          other_match_share: parent_match_share - my_match_share,
          session_commission,
        })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            console.log(response);
            Swal.fire("Create User Successfully");
            navigate(-1);
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        });
    } else {
      alert("Password and Confirm password not matched ");
    }
  };
  function cancalClick(){
       console.log("cancal")
       navigate(-1);
  }
  const userTypeShow = user_type
    .split("-")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

  return (
    <div
      style={{
        backgroundColor: "#2B2D3A",
        padding: "10px 5px",
        borderRadius: "10px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>Create new {userTypeShow}</h5>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          padding: "16px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="userName"
          >
            User Name
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="text"
            id="userName"
            onChange={handleChange(setUserName)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="text"
            id="firstName"
            value={first_name}
            onChange={handleChange(setFirstName)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="text"
            value={last_name}
            id="lastName"
            onChange={handleChange(setLastName)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="fixLimit"
          >
            Fix Limit
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            value={fix_limit}
            id="fixLimit"
            onChange={handleChange(setfix_limit)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="myMatchShare"
          >
            My Match Share
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            id="myMatchShare"
            max={parent_match_share}
            value={my_match_share}
            onChange={(e) => {
              if (e.target.value <= parent_match_share) {
                setmy_match_share(e.target.value);
              } else {
                setmy_match_share(parent_match_share);
              }
            }}
            required
          />
          <p style={{ fontSize: "14px", color: "gray" }}>
           <span style={{fontWeight:"700"}}>Note</span>:Range <span style={{ fontWeight: "800" }}>0</span> to{" "}
            <span style={{ fontWeight: "800" }}>{parent_match_share}</span>
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="otherMatchShare"
          >
            {userTypeShow} Match Share
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              color: "white",
            }}
            type="number"
            disabled
            id="otherMatchShare"
            value={parent_match_share - my_match_share}
            // onChange={()=>{setother_match_share(parent_match_share-my_match_share)}}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="matchCommission"
          >
            {userTypeShow} Match Commission
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            id="matchCommission"
            value={match_commission}
            onChange={handleChange(setmatch_commission)}
            required
          />
          <p style={{ fontSize: "14px", color: "gray" }}>
            <span style={{ fontWeight: "700" }}>Note:</span>Match commission can
            be set from 0 to <span style={{ fontWeight: "700" }}>2</span>
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="sessionCommission"
          >
            {userTypeShow} Session Commission
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            id="sessionCommission"
            value={session_commission}
            onChange={handleChange(setsession_commission)}
            required
          />
          <p style={{ fontSize: "14px", color: "gray" }}>
            <span style={{ fontWeight: "700" }}>Note:</span>Match commission can
            be set from 0 to <span style={{ fontWeight: "700" }}>2</span>
          </p>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="password"
            id="password"
            value={password}
            onChange={handleChange(setPassword)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="password"
            value={confirmPassword}
            id="confirmPassword"
            onChange={handleChange(setConfirmPassword)}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "start" }}>
          <button style={{ marginRight: "10px" }} onClick={()=>{cancalClick()}}>Cancal</button>
          <button
            type="submit"
            style={{
              backgroundColor: "#896CEF",
              color: "white",
              border: "none",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

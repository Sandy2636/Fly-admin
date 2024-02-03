import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CreateUser.css";
import axios from "../../authAxios";
import sha256 from "sha256";
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
  // const [user_type, setuseType] = useState("");
  const [parent_id, setparent_id] = useState(localStorage.getItem("userName"));
  const { user_type } = useParams();

  // useEffect(() => {
  //   const capitalizeFirstLetter = (input
  //     return input
  //       .split("-")
  //       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //       .join(" ");
  //   };
  //   // setuseType(user_type);
  // }, [user_type]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
          other_match_share,
          session_commission,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Password and Confirm password not matched ");
    }
  };
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
            type="text"
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
            type="text"
            id="myMatchShare"
            onChange={handleChange(setmy_match_share)}
            required
          />
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
            }}
            type="text"
            id="otherMatchShare"
            onChange={handleChange(setother_match_share)}
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
            type="text"
            id="matchCommission"
            onChange={handleChange(setmatch_commission)}
            required
          />
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
            type="text"
            id="sessionCommission"
            onChange={handleChange(setsession_commission)}
            required
          />
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
            id="confirmPassword"
            onChange={handleChange(setConfirmPassword)}
            required
          />
        </div>

        <div style={{ display: "flex", justifyContent: "start" }}>
          <button style={{ marginRight: "10px" }}>Cancle</button>
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

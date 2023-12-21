import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function CreateUser() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fixLimit, setFixLimit] = useState("");
  const [myMatchShare, setMyMatchShare] = useState("");
  const [otherMatchShare, setOtherMatchShare] = useState("");
  const [matchCommission, setMatchCommission] = useState("");
  const [sessionCommission, setSessionCommission] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setuseType] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const capitalizeFirstLetter = (input) => {
      return input.split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    };

    const userType = capitalizeFirstLetter(id);
    setuseType(userType);
  }, [id]);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      style={{
        backgroundColor: "#2B2D3A",
        padding: "10px 5px",
        borderRadius: "10px",
      }}
    >
      <h5 style={{textAlign:'center'}}>Create new {userType}</h5>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "40%", minWidth: "120px" }} htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            onChange={handleChange(setUserName)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            onChange={handleChange(setFirstName)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "40%", minWidth: "120px" }} htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            onChange={handleChange(setLastName)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "40%", minWidth: "120px" }} htmlFor="fixLimit">
            Fix Limit
          </label>
          <input
            type="text"
            id="fixLimit"
            onChange={handleChange(setFixLimit)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="myMatchShare"
          >
            My Match Share
          </label>
          <input
            type="text"
            id="myMatchShare"
            onChange={handleChange(setMyMatchShare)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="otherMatchShare"
          >
            {userType} Match Share
          </label>
          <input
            type="text"
            id="otherMatchShare"
            onChange={handleChange(setOtherMatchShare)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="matchCommission"
          >
            {userType} Match Commission
          </label>
          <input
            type="text"
            id="matchCommission"
            onChange={handleChange(setMatchCommission)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="sessionCommission"
          >
            {userType} Session Commission
          </label>
          <input
            type="text"
            id="sessionCommission"
            onChange={handleChange(setSessionCommission)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label style={{ width: "40%", minWidth: "120px" }} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange(setPassword)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "40%", minWidth: "120px" }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange(setConfirmPassword)}
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

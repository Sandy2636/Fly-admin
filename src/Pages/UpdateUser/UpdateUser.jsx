import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateUser.css";
import axios from "../../authAxios";
import ToggleButton from "react-toggle-button";
import sha256 from "sha256";
import Swal from "sweetalert2";
export default function UpdateUser() {
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
  const [user_type, setuseType] = useState("");
  const [agent_block, setagent_block] = useState(false);
  const [bet_block, setbet_block] = useState(false);
  const [parent_id, setparent_id] = useState(localStorage.getItem("userName"));
  const { user } = useParams();
  const [_id, set_id] = useState();
  const borderRadiusStyle = { borderRadius: 2 };
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const getUserData = async () => {
      axios
        .get("/users/get-user", { params: { username: user } })
        .then((result) => {
          console.log("user data ", result.data.user);
          setUserName(result.data.user.username);
          setFirstName(result.data.user.first_name);
          setLastName(result.data.user.last_name);
          setfix_limit(result.data.user.fix_limit);
          setmatch_commission(result.data.user.match_commission);
          setmy_match_share(result.data.user.my_match_share);
          setother_match_share(result.data.user.other_match_share);
          setsession_commission(result.data.user.session_commission);
          setparent_id(result.data.user.parent_id);
          setagent_block(result.data.user.agent_block);
          setbet_block(result.data.user.bets_block);
          set_id(result.data.user._id);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
          navigate(-1);
        });
    };
    getUserData();
  }, [user]);
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/users/update-user", {
        first_name,
        last_name,
        fix_limit,
        match_commission,
        session_commission,
        agent_block,
        bet_block,
        password: sha256(password),
        _id,
      })
      .then((response) => {
        Swal.fire("User update Successfully");
        navigate(-1);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        navigate(-1);
      });
  };
  function cancalClick() {
    console.log("cancal");
    navigate(-1);
  }
  return (
    <div
      style={{
        backgroundColor: "#2B2D3A",
        padding: "10px 5px",
        borderRadius: "10px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>Update {user}</h5>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
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
            value={username}
            onChange={handleChange(setUserName)}
            required
            readOnly
            disabled
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
            id="lastName"
            value={last_name}
            onChange={handleChange(setLastName)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="fixLimit"
          >
            Current Limit
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            id="fixLimit"
            value={fix_limit}
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
              color: "white",
              outline: "none",
            }}
            type="number"
            id="myMatchShare"
            value={my_match_share}
            disabled
            readOnly
            onChange={handleChange(setmy_match_share)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="otherMatchShare"
          >
            {user} Match Share
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              color: "white",
            }}
            type="number"
            id="otherMatchShare"
            value={other_match_share}
            readOnly
            disabled
            onChange={handleChange(setother_match_share)}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="matchCommission"
          >
            {user} Match Commission
          </label>
          <input
            style={{
              width: "100%",
              border: "none",
              outline: "none",
            }}
            type="number"
            value={match_commission}
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
            {user} Session Commission
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
        </div>

        <div style={{ marginBottom: "10px", display: "flex" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="password"
          >
            User Block
          </label>
          <ToggleButton
            value={agent_block}
            thumbStyle={borderRadiusStyle}
            trackStyle={borderRadiusStyle}
            onToggle={() => {
              setagent_block(!agent_block);
            }}
          />
        </div>

        <div style={{ marginBottom: "10px", display: "flex" }}>
          <label
            style={{ width: "100%", minWidth: "120px" }}
            htmlFor="password"
          >
            Bet Block
          </label>
          <div>
            <ToggleButton
              value={bet_block}
              thumbStyle={borderRadiusStyle}
              trackStyle={borderRadiusStyle}
              onToggle={() => {
                setbet_block(!bet_block);
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "start" }}>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => {
              cancalClick();
            }}
          >
            Cancal
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#896CEF",
              color: "white",
              border: "none",
            }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

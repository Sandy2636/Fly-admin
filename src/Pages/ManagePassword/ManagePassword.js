import React, { useState } from "react";
import axios from "axios";
import "./ManagePassword.scss";
import Popup from "../../Components/Popup/Popup";

export default function ManagePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [popUpShow, setpopUpShow] = useState(false);
  const [msg, setmsg] = useState("");
  const [title, settitle] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPass !== confirmPass) {
      setmsg("New Password and Confirm Password not matched.");
      settitle("Error");
      setpopUpShow(true);
      return;
    }

    try {
      const response = await axios.put(
        `/auth/change-password/${localStorage.getItem("_id")}`,
        {
          password: newPass,
        }
      );
      console.log("Password changed successfully.");
      setmsg("Password changed successfully.");
      settitle("Success");
      setpopUpShow(true);
    } catch (error) {
      console.error("Error changing password.");
      setmsg("Error in changing password.");
      settitle("Error");
      setpopUpShow(true);
    }
  };

  const okFun = () => {
    setpopUpShow(false);
  };

  return (
    <div className="changepassMain">
      <div className="changepass">
        <form onSubmit={handleOnSubmit}>
          <h5>Change Password</h5>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <button type="submit">Done</button>
        </form>
      </div>
      {popUpShow && <Popup okFun={okFun} msg={msg} title={title} />}
    </div>
  );
}

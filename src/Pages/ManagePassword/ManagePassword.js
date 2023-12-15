import React,{useState}from "react";
import "./ManagePassword.scss";
export default function ManagePassword() {
    const [oldPass, setoldPass] = useState()
    const [newPass, setnewPass] = useState()
    const [confirmPass, setconfirmPass] = useState()
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="changepassMain">
      <div className="changepass">
        <form action="" onSubmit={handleOnSubmit}>
          <h5>Change Password</h5>
          <input type="text" placeholder="Old Password" />
          <input type="text" placeholder="New Password" />
          <input type="text" placeholder="Confirm Password" />
          <button type="submit">Done</button>
        </form>
      </div>
    </div>
  );
}

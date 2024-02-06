import React, { useState} from "react";
import axios from "../../authAxios";
import sha256 from "sha256";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function ChangeUserPassword() {
  const { user } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        axios
            .put("/users/change-password", {
                password: sha256(password),
                username: user
            })
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    console.log(response);
                    Swal.fire("Password Change Successfully");
                    navigate(-1);
                } else {
                    throw new Error(`Unexpected response status: ${response.status}`);
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
                // navigate(-1);
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password not matched.",
        });
    }
};

  function cancalClick() {
    console.log("cancal");
    navigate(-1);
  }
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };
  return (
    <div
      style={{
        backgroundColor: "#2B2D3A",
        padding: "10px 5px",
        borderRadius: "10px",
      }}
    >
      <h5 style={{ textAlign: "center" }}>Change password</h5>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px", margin: "auto" }}
      >
        <div>
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

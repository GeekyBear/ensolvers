import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await authService.login(username, password).then(
        () => {
          navigate("/");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ color: "wheat", display: "flex", gap: 16, alignItems: "center" }}
    >
      <label>
        user:{" "}
        <input
          name="username"
          value={username}
          onChange={(e) => handleChangeUser(e)}
        />
      </label>
      <label>
        password:{" "}
        <input
          name="password"
          value={password}
          onChange={(e) => handleChangePassword(e)}
        />
      </label>
      <button
        style={{
          padding: 8,
          backgroundColor: "black",
          color: "wheat",
        }}
        onClick={(e) => handleLogin(e)}
      >
        Send
      </button>
    </div>
  );
}

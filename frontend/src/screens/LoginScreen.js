import React, { useState } from "react";
import styles from "./LoginScreen.module.css";
import { TextField, Button, Typography, Container } from "@mui/material";

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      // REMOVE SENSITIVE INFORMATION. THIS IS JUST FOR DEMO PURPOSES.
      // DO NOT STORE PASSWORDS. USE DOTENV FOR SENSITIVE INFORMATION.
      username === "admin" &&
      password === "Potato4."
    ) {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container className={styles.loginContainer}>
      <Typography variant="h4" className={styles.loginTitle}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        className={styles.loginInput}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        className={styles.loginInput}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.loginButton}
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
}

export default LoginScreen;

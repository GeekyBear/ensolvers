import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import ArchivedNotesScreen from "./screens/ArchivedNotesScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route
              path="/"
              element={<MainScreen handleLogout={handleLogout} />}
            />
            <Route
              path="/archived"
              element={<ArchivedNotesScreen handleLogout={handleLogout} />}
            />
          </Routes>
        </>
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;

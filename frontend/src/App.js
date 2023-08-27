import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Archived from "./views/Archived";
import Login from "./views/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="archived" element={<Archived />} />
      </Routes>
    </div>
  );
}

export default App;

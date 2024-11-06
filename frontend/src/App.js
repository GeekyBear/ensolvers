import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import ArchivedNotesScreen from "./screens/ArchivedNotesScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/archived" element={<ArchivedNotesScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

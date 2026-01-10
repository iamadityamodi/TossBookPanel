import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Bet from "./Bets";
import AddUser from "./AddUser";
import Test from "./Test";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true); // update state
  };

  const handleLogout = () => {
    localStorage.clear(); // clear everything related to auth
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? (
          <Navigate to="/dashboard" />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/" replace />
        }
      />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/bets" element={<Bet />} />
      <Route path="/Test" element={<Test />} />
    </Routes>
  );
}

export default App;

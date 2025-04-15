import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Upload from "./components/Upload";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <NavBar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated 
              ? <Navigate to="/home" /> 
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/about"
          element={isAuthenticated ? <About /> : <Navigate to="/" />}
        />
        <Route
  path="/upload"
  element={isAuthenticated ? <Upload /> : <Navigate to="/" />}
/>

      </Routes>
    </Router>
  );
}

export default App;

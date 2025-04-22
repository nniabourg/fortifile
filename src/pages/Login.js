import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../main.css';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <section id="contact"> {/* Reusing contact styling for layout */}
      <div className="about-box" style={{ paddingTop: "200px" }}>
        <h1><span>Login</span></h1>
        <form onSubmit={handleLogin}>
          <div className="input-box" style={{ width: "50%" }}>
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-box" style={{ width: "50%", paddingTop: "30px" }}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-box" style={{ paddingTop: "40px", paddingRight: "270px"        }}>
            <button type="submit" className="btn">Login</button>

        </div>
          
        </form>
      </div>
    </section>
  );
}

export default Login;
 

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Login.css";

const Login = () => {
  const api_url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api_url}/api/user/login`, formData);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        alert("Login Successfully");
        setFormData({ email: "", password: "" });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

    return (
    <div className="login-page">

      {/* LEFT */}
      <div className="login-left">
        <div className="login-card">

          <div className="logo"><span>🛒</span></div>
          <h1 className="title">Welcome Back 👋</h1>
          <p className="subtitle">Login to your Admin Dashboard</p>

          <form onSubmit={loginUser}>

            <div className="input-group">
              <label>Email Address</label>
              <div className="input-box">
                <span className="icon">📧</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-box">
                <span className="icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <div className="remember-row">
              <label><input type="checkbox" /> Remember Me</label>
              <span className="forgot-link" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
            </div>

            <button type="submit" className="login-btn">Login →</button>

          </form>

          <p className="bottom-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>

        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <video autoPlay muted loop playsInline className="bg-video">
          <source
            src="https://media.istockphoto.com/id/1475146936/video/online-shopping-with-big-telephone-screen-icon-woman-doing-online-shopping-with-fancy-clothes.mp4?s=mp4-640x640-is&k=20&c=BbpP5qbJiKFuUPrY8i52dXYjm5WALFooX3CE-BHqPKc="
            type="video/mp4"
          />
        </video>
        <div className="overlay">
          <div className="overlay-content">
            <h1>E-Commerce Admin</h1>
            <p>Manage Products, Orders, Customers & Analytics.</p>
            <div className="feature-list">
              <div>✔ Smart Inventory</div>
              <div>✔ Fast Order Management</div>
              <div>✔ Customer Analytics</div>
              <div>✔ Secure Admin Panel</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;

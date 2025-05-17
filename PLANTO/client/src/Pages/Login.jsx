import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, formData);

      if (response.data.success) {
        toast.success("Login Successful!");

        
          const user = response.data.user || {}; 
          localStorage.setItem("userEmail", user.email || ""); 
          localStorage.setItem("profileImage", user.profileImage || ""); 
        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Something went wrong, try again!");
    }
  };

  return (
    <section className="section-wrapper">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />

        <div className="bottom-buttons">
          <p>Don't have an account?</p>
          <Link to="/register">
            <button className="toggle-btn">Register</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;

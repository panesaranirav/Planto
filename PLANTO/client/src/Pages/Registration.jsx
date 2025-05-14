import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";
import process from 'process'
const Registration = () => {
  const navigate = useNavigate();
  
  
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null, 
  });

 
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    setUserData({ ...userData, profileImage: e.target.files[0] });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstname", userData.firstname);
      formData.append("lastname", userData.lastname);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);
      formData.append("profileImage", userData.profileImage); 

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Registration successful!");

        
        const user = response.data.user;
        localStorage.setItem("userEmail", user.email);
        if (user.profileImage) {
          localStorage.setItem("profileImage", user.profileImage);
        }

        
        setTimeout(() => {
          navigate("/home");
          window.location.reload(); 
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Something went wrong, try again!");
    }
  };


  return (
    <section className="section-wrapper">
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname"  required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname"  required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone"required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password"  required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>

        
        <ToastContainer position="top-right" autoClose={2000} />

     
        <div className="bottom-buttons">
          <p>Already have an account?</p>
          <Link to="/">
            <button className="toggle-btn">Login</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Registration;

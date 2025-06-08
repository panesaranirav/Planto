import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

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

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstname":
      case "lastname":
        if (value.length < 2) {
          error = `${name} must be at least 2 characters long`;
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!validatePhone(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          error = "Password must be at least 8 characters long and contain at least one number";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleFileChange = (e) => {
    setUserData({ ...userData, profileImage: e.target.files[0] });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(userData).forEach(key => {
      if (key !== 'profileImage') {
        const error = validateField(key, userData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstname", userData.firstname);
      formData.append("lastname", userData.lastname);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("password", userData.password);
      formData.append("profileImage", userData.profileImage);

      const response = await axios.post(
        "https://planto-6.onrender.com/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
            <input
              type="text"
              id="firstname"
              name="firstname"
              required
              onChange={handleChange}
              value={userData.firstname}
            />
            {errors.firstname && <span className="error-message">{errors.firstname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required
              onChange={handleChange}
              value={userData.lastname}
            />
            {errors.lastname && <span className="error-message">{errors.lastname}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              value={userData.email}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              onChange={handleChange}
              value={userData.phone}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                onChange={handleChange}
                value={userData.password}
              />
              <span 
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        <ToastContainer position="top-right" autoClose={1000} />

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

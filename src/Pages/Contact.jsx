import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import './Contact.css';
import { useState } from "react";
import image from '../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Copyright from '../Components/Copyright'

const Contact = () => {

  const initialFormData ={
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData(initialFormData);

    toast.success('Message sent successfully!', {
      position: 'top-right',
      autoClose: 2000
    });

    console.log('Submitted Data:', formData);
  };

  return (
    <div>
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="context-main">
        <div className="context-img">
          <img src={image.plant} alt="" />
        </div>
        <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
          <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
      </div>
      <div className="footer">
        <Footer />
        <Copyright/>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;

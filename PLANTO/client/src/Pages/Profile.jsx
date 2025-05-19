import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phoneNumber: '123-456-7890',
    password: '********',
    profileImage: '/path/to/image.jpg',  // Path to the profile image
  });

  useEffect(() => {

  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Profile Details</h2>
      </div>

      <div className="profile-card">
        <div className="profile-img-container">
          <img
  src={profileData.profileImage || 'https://i.pravatar.cc/160?img=68'}
  alt="Profile"
  className="profile-img"
/>

        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>First Name:</label>
            <p>{profileData.firstName}</p>
          </div>
          <div className="info-row">
            <label>Last Name:</label>
            <p>{profileData.lastName}</p>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <p>{profileData.email}</p>
          </div>
          <div className="info-row">
            <label>Phone Number:</label>
            <p>{profileData.phoneNumber}</p>
          </div>
          <div className="info-row">
            <label>Password:</label>
            <p>{profileData.password}</p>
          </div>
        </div>
      </div>

      <div className="action-btns">
        <button className="edit-btn">Edit Profile</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Profile;

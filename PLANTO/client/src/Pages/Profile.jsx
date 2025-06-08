import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import Loader from '../Components/Loader';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const API_BASE = import.meta.env.VITE_BACKEND_URL;
  const email = localStorage.getItem('userEmail');

 
 

  useEffect(() => {
    if (!email) return;

    axios
      .get(`${API_BASE}/api/user-profile?email=${email}`)
      .then((res) => {
        setProfileData(res.data.user);
        setFormData(res.data.user);
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, [email]);

   useEffect(() => {
  if (profileData) {
    setFormData(profileData);
  }
}, [profileData]);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`${API_BASE}/api/update-profile`, {
        email,
        ...formData,
      });
      setProfileData(res.data.updatedUser);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/api/delete-profile?email=${email}`);
      alert('Profile deleted.');
      
      localStorage.removeItem('userEmail');
      window.location.href = '/'; 
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (!profileData) return <div>
    <Loader/>
  </div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Profile Details</h2>
      </div>

      <div className="profile-card">
        <div className="profile-img-container">
          <img
            src={
              profileData.profileImage ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
            }
            alt="Profile"
            className="profile-img1"
          />
        </div>

        <div className="profile-info">
          {['firstname', 'lastname', 'email', 'phoneNumber'].map((field) => (
            <div className="info-row" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{profileData[field]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="action-btns">
        {editMode ? (
          <>
            <button className="save-btn" onClick={handleUpdate}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
            <button className="logout-btn" onClick={handleDelete}>
              Delete Profile
            </button>
            <button className="back-btn" onClick={handleDelete}>
              Back To Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;

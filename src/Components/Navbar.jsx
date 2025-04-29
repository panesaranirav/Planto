import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart,faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import assets from "../assets/assets";
import { useState,useEffect } from "react";
import axios from "axios";

const Navbar = () => {

  const [profileImage, setProfileImage] = useState('');
  const userEmail = localStorage.getItem("userEmail");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!userEmail) return;
        const response = await axios.get(`http://localhost:5000/user-profile`,{
          params: { email: encodeURIComponent(userEmail)}, 
        });

        if (response.data.user.profileImage) {
          setProfileImage(response.data.user.profileImage);
          localStorage.setItem("profileImage", response.data.user.profileImage);
          console.log(profileImage)
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <nav>
      <div className="nav-sec">
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>
        <div className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
        
        <div className={`navgation ${menuOpen ? "show" : ""}`}>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/plants">Plants</Link></li>
            <li><Link to="/more">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="right-sec">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </div>
          <div className="cart">
          <Link to="/cart">
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
          </div>
          <div className="user">
          <Link to="/profile">  
          <img 
       src={profileImage || "/src/assets/people.png"} 
        alt="Profile"
        className="profile-img"
      />
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

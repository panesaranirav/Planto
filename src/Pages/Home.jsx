import React from "react";
import Benner from "./Benner";
import './Home.css'
import Trandyplant from "./Trandyplant";
import Topselling from "../Components/Topselling";
import Ourbest from "../Components/Ourbest";
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'
import Copyright from "../Components/Copyright";
const Home = () => {
  return (
    <div>
      <div className="benner">
        <Navbar/>
        <Benner />
        <Trandyplant/>
      </div>
      <Topselling/>
      <Ourbest/>
     <div> 
     <Footer/>
     <Copyright/>
     </div>
    </div>
  );
};

export default Home;

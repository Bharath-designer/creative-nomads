import React from "react";
import "../styles/components/TopNavBar.css";

import logo from "../assets/logo.png";
import search from "../assets/search.svg"
import plus from "../assets/plus.svg"
import notification from "../assets/notification.svg"
import profile from "../assets/profile.png"


const TopNavBar = () => {
  return (
    <div className="top-nav-container">
      <div className="left nav-content">
        <div className="logo-container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="logo-text">Protrack</div>
        </div>
        <div className="search-container">
          <img src={search} alt="" />
          <input placeholder="Search" type="text" name="" id="" />
        </div>
      </div>
      <div className="right nav-content">
        <div className="add-task-btn">
            <img src={plus} alt="" />
            ADD TASKS
        </div>
        <div className="notification">
            <img src={notification} alt="" />
        </div>
        <div className="profile">
            <img src={profile} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;

import React from "react";

import "../styles/components/SideNavBar.css";

import home from "../assets/category.svg";
import calendar from "../assets/calendar.svg";
import tasks from "../assets/tasks.svg";
import notes from "../assets/folder.svg";

import home_active from "../assets/category-active.svg";
import calendar_active from "../assets/calendar-active.svg";
import tasks_active  from "../assets/tasks-active.svg";
import notes_active  from "../assets/folder-active.svg";

import upgrade_icon from "../assets/upgrade-icon.png";
import profile from "../assets/profile.png";
import settings from "../assets/Setting.svg";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleOptions } from "../store/OptionsSlice";

const SideNavBar = () => {

  const dispatch = useDispatch()

  const openOptions = () => {
    dispatch(toggleOptions(true))
  }

  return (
    <div className="side-nav-container">
      <div className="top-side">
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          to={'/'}
        >
          <span>
            <img className="non-active" src={home} alt="" />
            <img className="active" src={home_active} alt="" />
          </span>
          <span>Home</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          to={'/calendar'}
        >
          <span>
            <img className="non-active" src={calendar} alt="" />
            <img className="active" src={calendar_active} alt="" />
          </span>
          <span>Calendar</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          to={'/tasks'}
        >
          <span>
            <img className="non-active" src={tasks} alt="" />
            <img className="active" src={tasks_active} alt="" />
          </span>
          <span>Tasks</span>
        </NavLink>
        <NavLink
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          to={'/notes'}
        >
          <span>
            <img className="non-active" src={notes} alt="" />
            <img className="active" src={notes_active} alt="" />
          </span>
          <span>Notes</span>
        </NavLink>
      </div>
      <div className="bottom-side">
        <div className="upgrade-banner">
          <div className="title">Upgrade to PRO</div>
          <div className="desc">
            <div>to get access to all features!</div>
            <div>Connect with Protrack World!</div>
          </div>
          <div className="popup">
            <img src={upgrade_icon} alt="" />
          </div>
        </div>
        <div className="account-details">
          <div className="col col-1">
            <img src={profile} alt="" />
          </div>
          <div className="col col-2">
            <div className="name">Dalton Smith</div>
            <div className="acc-desc">Free Account</div>
          </div>
          <div className="col col-3">
            <img onClick={openOptions} src={settings} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;

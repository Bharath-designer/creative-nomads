import React, { useEffect } from "react";

import "../../styles/components/Home/WeeklyOverview.css";

import graph_history from "../../assets/graphbtn.svg"
import greenup from "../../assets/greenup.svg"

import green_tick from "../../assets/green-round-tick.svg"

import book from "../../assets/book.svg"

const WeeklyOverview = () => {

  return (
    <div className="weekly-overview-container">
      <div className="top">
        <div className="title">Weekly Overview</div>
        <div className="graph-icon">
            <img src={graph_history} alt="" />
        </div>
      </div>
      <div className="content">
        <div className="left">
            <div className="percent">
                <div className="amount">20</div>
                <div className="icon"><img src={greenup} alt="" /></div>
                <div className="change-percent">+2.45%</div>
            </div>
            <div className="task-status">Task Completed</div>
            <div className="task-track">
                <span><img src={green_tick} alt="" /></span>
                <span>On track</span>
            </div>
            <button className="open-task-btn">
                <img src={book} alt="" />
                <span>OPEN TASKS</span>
            </button>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default WeeklyOverview;

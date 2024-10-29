import React from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import TopNavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";

const App = () => {
  return (
    <div className="app-wrapper">
      <TopNavBar />
      <div className="app-content">
          <SideNavBar/>
          <Outlet />
      </div>
    </div>
  );
};

export default App;

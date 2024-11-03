import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import TopNavBar from "./components/TopNavBar";
import SideNavBar from "./components/SideNavBar";
import OptionsDialog from "./components/OptionsDialog";

const App = () => {

  return (
    <div className="app-wrapper">
      <TopNavBar />
      <div className="app-content">
        <SideNavBar />
        <Outlet />
      </div>
      <OptionsDialog />
    </div>
  );
};

export default App;

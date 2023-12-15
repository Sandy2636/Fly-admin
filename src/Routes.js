import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/Homelayout/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LiveMatches from "./Pages/LiveMatches/LiveMatches";
import CasinoReport from "./Pages/CasinoReport/CasinoReport";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<HomeLayout child={<Dashboard/>} />}
        ></Route>
        <Route
          path="/liveMatches"
          element={<HomeLayout child={<LiveMatches/>} />}
        ></Route>
         <Route
          path="/casinoReport"
          element={<HomeLayout child={<CasinoReport/>} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/Homelayout/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LiveMatches from "./Pages/LiveMatches/LiveMatches";
import CasinoReport from "./Pages/CasinoReport/CasinoReport";
import BlockSport from "./Pages/BlockMarket/BlockSport";
import ManagePassword from "./Pages/ManagePassword/ManagePassword";
import CollectionReport from "./Pages/ManageLedgers/CollectionReport/CollectionReport";

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
         <Route
          path="/blockSports"
          element={<HomeLayout child={<BlockSport/>} />}
        ></Route>
        <Route
          path="/managePassword"
          element={<HomeLayout child={<ManagePassword/>} />}
        ></Route>
        <Route
          path="/collectionReport"
          element={<HomeLayout child={<CollectionReport/>} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;

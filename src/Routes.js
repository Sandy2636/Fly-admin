import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/Homelayout/HomeLayout";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<HomeLayout child={<h1>TA DA DA</h1>} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./Layout/Homelayout/HomeLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LiveMatches from "./Pages/LiveMatches/LiveMatches";
import CasinoReport from "./Pages/CasinoReport/CasinoReport";
import BlockSport from "./Pages/BlockMarket/BlockSport";
import ManagePassword from "./Pages/ManagePassword/ManagePassword";
import CollectionReport from "./Pages/ManageLedgers/CollectionReport/CollectionReport";
import ManageSuperStockist from "./Pages/Manage/ManageSuperStockist/ManageSuperStockist";
import ManageStockist from "./Pages/Manage/ManageStockist/ManageStockist";
import ManageUser from "./Pages/Manage/ManageUser/ManageUser";
import MyClient from "./Pages/ManageClients/MyClient/MyClient";
import BlockedClients from "./Pages/ManageClients/BlockedClients/BlockedClients";
import CommisionAndLimits from "./Pages/ManageClients/CommisionAndLimits/CommisionAndLimits";
import CompanyReport from "./Pages/ManageLedgers/CompanyReport/CompanyReport";
import MyStatement from "./Pages/ManageLedgers/MyStatement/MyStatement";
import ProfitAndLoss from "./Pages/ManageLedgers/ProfitAndLoss/ProfitAndLoss";

function AppRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomeLayout child={<Dashboard />} />}></Route>
        <Route
          path="/manage/sst"
          element={<HomeLayout child={<ManageSuperStockist />} />}
        ></Route>
        <Route
          path="/manage/stockist"
          element={<HomeLayout child={<ManageStockist />} />}
        ></Route>
        <Route
          path="/manage/user"
          element={<HomeLayout child={<ManageUser />} />}
        ></Route>
        <Route
          path="/live-matches"
          element={<HomeLayout child={<LiveMatches />} />}
        ></Route>
        <Route
          path="/completed-matches"
          element={<HomeLayout child={<h1>Completed</h1>} />}
        ></Route>
        <Route
          path="/casino-report"
          element={<HomeLayout child={<CasinoReport />} />}
        ></Route>
        <Route
          path="/block-sports"
          element={<HomeLayout child={<BlockSport />} />}
        ></Route>
        <Route
          path="/clients/my-clients"
          element={<HomeLayout child={<MyClient />} />}
        ></Route>
        <Route
          path="/clients/blocked-clients"
          element={<HomeLayout child={<BlockedClients />} />}
        ></Route>
        <Route
          path="/clients/commission-and-limits"
          element={<HomeLayout child={<CommisionAndLimits />} />}
        ></Route>
        <Route
          path="/language"
          element={<HomeLayout child={<h1>language</h1>} />}
        ></Route>
        <Route
          path="/manage-password"
          element={<HomeLayout child={<ManagePassword />} />}
        ></Route>
        <Route
          path="/ledger/collection-report"
          element={<HomeLayout child={<CollectionReport />} />}
        ></Route>
        <Route
          path="/ledger/company-ledger"
          element={<HomeLayout child={<CompanyReport />} />}
        ></Route>
        <Route
          path="/ledger/my-statement"
          element={<HomeLayout child={<MyStatement />} />}
        ></Route>
        <Route
          path="/ledger/profit-loss"
          element={<HomeLayout child={<ProfitAndLoss />} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;

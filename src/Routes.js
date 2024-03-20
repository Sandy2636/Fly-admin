import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Language from "./Pages/Language/Language";
import CompanyLedger from "./Pages/ManageLedgers/CompanyLedger/CompanyLedger";
import CompletedMatches from "./Pages/CompletedMatches/CompletedMatches";
import CreateUser from "./Pages/CreateUser/CreateUser";
import SuperAdmin from "./Pages/Manage/SuperAdmin/SuperAdmin";
import Admin from "./Pages/Manage/Admin/Admin";
import Login from "./Pages/Login/Login";
import Cookies from "js-cookie";
import Agent from "./Pages/Manage/Agent/Agent";
import NotFound from "./Pages/NotFound/NotFound";
import UpdateUser from "./Pages/UpdateUser/UpdateUser";
import ChangeUserPassword from "./Pages/ChangeUserPassword/ChangeUserPassword";
import Reports from "./Pages/Reports/Reports";
import LiveReport from "./Pages/Reports/LiveReport/LiveReport";
import SessionBetSlip from "./Pages/Reports/SessionBetSlip/SessionBetSlip";

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <div>
      <PrivateRoutes />
    </div>
  );
}

const PrivateRoutes = () => {
  const navigate = useNavigate();
  if (Cookies.get("jwtToken") && localStorage.getItem("isUserLoggedIn")) {
    return (
      <Routes>
        <Route path="/" element={<HomeLayout child={<Dashboard />} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/manage/super-admin"
          element={<HomeLayout child={<SuperAdmin />} />}
        ></Route>
        <Route
          path="/manage/super-stockist"
          element={<HomeLayout child={<ManageSuperStockist />} />}
        ></Route>
        <Route
          path="/manage/admin"
          element={<HomeLayout child={<Admin />} />}
        ></Route>
        <Route
          path="/manage/stockist"
          element={<HomeLayout child={<ManageStockist />} />}
        ></Route>
        <Route
          path="/manage/agent"
          element={<HomeLayout child={<Agent />} />}
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
          element={<HomeLayout child={<CompletedMatches />} />}
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
          element={<HomeLayout child={<Language />} />}
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
          element={<HomeLayout child={<CompanyLedger />} />}
        ></Route>
        <Route
          path="/ledger/my-statement"
          element={<HomeLayout child={<MyStatement />} />}
        ></Route>
        <Route
          path="/ledger/profit-loss"
          element={<HomeLayout child={<ProfitAndLoss />} />}
        ></Route>
        <Route
          path="/manage/:user_type/create-user"
          element={<HomeLayout child={<CreateUser />} />}
        ></Route>
        <Route
          path="/manage/update-user/:user"
          element={<HomeLayout child={<UpdateUser />} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="/manage/change-password/:user"
          element={<HomeLayout child={<ChangeUserPassword />} />}
        ></Route>
         <Route
          path="/live-matches/reports/:match_id"
          element={<HomeLayout child={<Reports/>} />}
        ></Route>
          <Route
          path="/live-matches/reports/:match_id/live-report"
          element={<HomeLayout child={<LiveReport/>} />}
        ></Route>
        <Route
          path="/live-matches/reports/:match_id/sessionbet-slip"
          element={<HomeLayout child={<SessionBetSlip/>} />}
        ></Route>
         <Route
          path="/completed-matches/reports/:match_id"
          element={<HomeLayout child={<Reports/>} />}
        ></Route>
          <Route
          path="/completed-matches/reports/:match_id/live-report"
          element={<HomeLayout child={<LiveReport/>} />}
        ></Route>
        <Route
          path="/completed-matches/reports/:match_id/sessionbet-slip"
          element={<HomeLayout child={<SessionBetSlip/>} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="*" element={<Login />} />;
      </Routes>
    );
  }
};
export default AppRoutes;

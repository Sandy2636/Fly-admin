import React, { useState, useEffect } from "react";
import Table from "../../Components/Table/Table";
import axios from "../../authAxios";
import { Tab, Tabs } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { useNavigate, useParams,Link } from "react-router-dom";
import { MdOutlineClear } from "react-icons/md";
export default function CompletedMatches() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabSport, setActiveTabSport] = useState(0);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [matches, setMatches] = useState([]);
  const [sports_id, setSports_id] = useState(4);
  const [profitAndLoss, setProfitAndLoss] = useState({});

  const getCompletedMatchs = async (sports_id) => {
    setMatches([]);
    try {
      let res = await axios.get("/matches/getCompletedMatches/" + sports_id);
      if (res.data.status) {
        setMatches(res.data.dataobj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProfitAndLossOfCompletedMatchs = async () => {
    try {
      let res = await axios.get("/users/getProfitAndLossOfCompletedMatchs", {
        params: {
          user_id: localStorage.getItem("user_id"),
        },
      });
      if (res.data.status) {
        setProfitAndLoss(res.data.profit_loss_ledger);
      }
    } catch (err) {
      console.log(err);
      setProfitAndLoss({});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCompletedMatchs(sports_id);
    };
    getProfitAndLossOfCompletedMatchs();
    fetchData();
  }, [activeTab, sports_id]);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.matchObj.id,
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => (
        <Link
          to={`/completed-matches/reports/${row.matchObj.id}`}
          style={{ color: "#4be14b", }}
        >
          {row.matchObj.name}
        </Link>
      ),
      wrap:"true"
    },
    {
      name: "Date",
      selector: (row) => row.matchObj.openDate,
    },
    {
      name: "Declare",
      selector: (row) => (row.matchObj.status == "declared" ? "No" : "Yes"),
      width: "100px",
    },
    {
      name: "Won By",
      selector: (row) => row.winner,
    },
    {
      name: "Profit/ Loss",
      selector: (row) => profitAndLoss?.[row.match_id] || "Report Not Avilable",
    },
  ];

  const returnCurrentTabTable = () => {
    if (activeTab == 1 && activeTabSport == 0)
      return (
        <Table
          title="Completed Cricket Matches"
          data={matches}
          columns={columns}
        />
      );
    else if (activeTab == 1 && activeTabSport == 1)
      return (
        <Table
          title="Completed Soccer Matches"
          data={matches}
          columns={columns}
        />
      );
    else if (activeTab == 1 && activeTabSport == 2)
      return (
        <Table
          title="Completed Tennis Matches"
          data={matches}
          columns={columns}
        />
      );
    else return <></>;
  };
  return (
    <div>
      <div style={{ padding: "16px 0" }}>
        {/* <div style={{backgroundColor:"white"}}> */}
        <DateRangePicker
          onChange={onChange}
          value={value}
          clearIcon={<MdOutlineClear color="white" />}
          calendarIcon={<SlCalender color="white" />}
          format={"dd-MM-y"}
        />
        {/* </div> */}

        <Tabs
          value={activeTabSport}
          sx={{
            ".Mui-selected": {
              color: `#fff`,
              outline: "none",
            },
            "&:hover": {
              outline: "none",
            },
          }}
          TabIndicatorProps={{ style: { background: "#896cef" } }}
          aria-label="tabs example"
          onChange={(e, newVal) => {
            setActiveTabSport(newVal);
          }}
        >
          <Tab
            value={0}
            label={
              <span style={{ color: activeTabSport == 0 ? "#896cef" : "#fff" }}>
                Cricket
              </span>
            }
          />
          <Tab
            value={1}
            label={
              <span style={{ color: activeTabSport == 1 ? "#896cef" : "#fff" }}>
                Soccer
              </span>
            }
          />
          <Tab
            value={2}
            label={
              <span style={{ color: activeTabSport == 2 ? "#896cef" : "#fff" }}>
                Tennis
              </span>
            }
          />
        </Tabs>
      </div>
      {returnCurrentTabTable()}
    </div>
  );
}

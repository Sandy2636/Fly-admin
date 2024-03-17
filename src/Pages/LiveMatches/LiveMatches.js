import React, { useState, useEffect } from "react";
import axios from "../../authAxios";
import "./LiveMatches.css";
import { useNavigate, useParams,Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Table from "../../Components/Table/Table";
import { Tab, Tabs } from "@mui/material";
import { TbReport } from "react-icons/tb";

export default function LiveMatches() {
  const params = useParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabSport, setActiveTabSport] = useState(0);
  const [sports_id, setSports_id] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === 0) {
        await getLiveMatches(sports_id);
      } else {
        await getUpcomingMatches(sports_id);
      }
    };

    fetchData();
  }, [activeTab, sports_id]);

  const getLiveMatches = async (sports_id) => {
    setMatches([]);
    try {
      let res = await axios.get("/matches/getLiveMatches/" + sports_id);
      if (res.data.status) {
        setMatches(res.data.dataobj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUpcomingMatches = async (sports_id) => {
    setMatches([]);
    try {
      let res = await axios.get("/matches/getUpcommingMatches/" + sports_id);
      if (res.data.status) {
        setMatches(res.data.dataobj);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          to={`/live-matches/reports/${row.matchObj.id}`}
          style={{ color: "blue", }}
        >
          {row.matchObj.name}
        </Link>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.matchObj.openDate,
    },
    {
      name: "Profit/ Loss",
      selector: (row) => row.profit_loss,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <button style={{backgroundColor:"#9d2525",color:"white",border:'none'}} onClick={()=>{navigate("/live-matches/reports/"+row.matchObj.id+"/live-report")}}>Live Report</button>
        </div>
      ),
    },
  ];

  const returnCurrentTabTable = () => {
    if (activeTab === 0 && activeTabSport === 0)
      return (
        <Table title="Live Cricket Matches" data={matches} columns={columns} />
      );
    else if (activeTab === 0 && activeTabSport === 1)
      return (
        <Table title="Live Soccer Matches" data={matches} columns={columns} />
      );
    else if (activeTab === 0 && activeTabSport === 2)
      return (
        <Table title="Live Tennis Matches" data={matches} columns={columns} />
      );
    else if (activeTab === 1 && activeTabSport === 0)
      return (
        <Table
          title="Upcoming Cricket Matches"
          data={matches}
          columns={columns}
        />
      );
    else if (activeTab === 1 && activeTabSport === 1)
      return (
        <Table
          title="Upcoming Soccer Matches"
          data={matches}
          columns={columns}
        />
      );
    else if (activeTab === 1 && activeTabSport === 2)
      return (
        <Table
          title="Upcoming Tennis Matches"
          data={matches}
          columns={columns}
        />
      );
    else return <></>;
  };

  return (
    <div>
      <div style={{ overflow: "auto" }}>
        <div
          style={{
            padding: "16px 0",
            display: "grid",
            placeItems: "center",
            background: "#2b2d3a",
            borderRadius: "8px",
            marginBottom: "8px",
          }}
        >
          <Tabs
            value={activeTab}
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
              setActiveTab(newVal);
            }}
          >
            <Tab
              value={0}
              label={
                <span style={{ color: activeTab === 0 ? "#896cef" : "#fff" }}>
                  In Play Matches
                </span>
              }
            />
            <Tab
              value={1}
              label={
                <span style={{ color: activeTab === 1 ? "#896cef" : "#fff" }}>
                  Upcoming Matches
                </span>
              }
            />
          </Tabs>
        </div>
        <div
          style={{
            padding: "16px 0",
            display: "grid",
            placeItems: "center",
            background: "#2b2d3a",
            borderRadius: "8px",
          }}
        >
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
                <span
                  style={{ color: activeTabSport === 0 ? "#896cef" : "#fff" }}
                >
                  Cricket
                </span>
              }
            />
            <Tab
              value={1}
              label={
                <span
                  style={{ color: activeTabSport === 1 ? "#896cef" : "#fff" }}
                >
                  Soccer
                </span>
              }
            />
            <Tab
              value={2}
              label={
                <span
                  style={{ color: activeTabSport === 2 ? "#896cef" : "#fff" }}
                >
                  Tennis
                </span>
              }
            />
          </Tabs>
        </div>
        {returnCurrentTabTable()}
      </div>
    </div>
  );
}

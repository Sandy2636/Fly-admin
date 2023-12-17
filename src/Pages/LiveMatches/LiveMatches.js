import React, { useState } from "react";
import "./LiveMatches.css";
import { useNavigate, useParams } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import Table from "../../Components/Table/Table";
import { Tab, Tabs } from "@mui/material";
export default function LiveMatches() {
  const params = useParams();
  const navigate = useNavigate();
  const [matches, setmatches] = useState(["a", "b"]);
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabSport, setActiveTabSport] = useState(0);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "PID",
      selector: (row) => row.pid,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Sport",
      selector: (row) => row.sports,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Profit/ Loss",
      selector: (row) => row.profit_loss,
    },
  ];

  const data = [
    {
      id: 1,
      pid: "idk",
      title: "India vs Pakistan",
      sports: "Cricket",
      profit_loss: "20",
      date: new Date().toLocaleString(),
    },
    {
      id: 2,
      pid: "idk",
      title: "India vs Pakistan",
      sports: "Cricket",
      profit_loss: "20",
      date: new Date().toLocaleString(),
    },
  ];

  const returnCurrentTabTable = () => {
    if (activeTab === 0 && activeTabSport == 0)
      return (
        <Table title="Live Cricket Matches" data={data} columns={columns} />
      );
    else if (activeTab === 0 && activeTabSport == 1)
      return (
        <Table title="Live Soccer Matches" data={data} columns={columns} />
      );
    else if (activeTab == 0 && activeTabSport == 2)
      return (
        <Table title="Live Tennis Matches" data={data} columns={columns} />
      );
    else if (activeTab == 1 && activeTabSport == 0)
      return (
        <Table title="Upcoming Cricket Matches" data={data} columns={columns} />
      );
    else if (activeTab == 1 && activeTabSport == 1)
      return (
        <Table title="Upcoming Soccer Matches" data={data} columns={columns} />
      );
    else if (activeTab == 1 && activeTabSport == 2)
      return (
        <Table title="Upcoming Tennis Matches" data={data} columns={columns} />
      );
    else return <></>;
  };
  return (
    <div>
      <div style={{ overflow: "auto" }}>
        {/* <MyComponent /> */}
        <div style={{ padding: "16px 0" }}>
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
                <span style={{ color: activeTab == 0 ? "#896cef" : "#fff" }}>
                  In Play Matches
                </span>
              }
            />
            <Tab
              value={1}
              label={
                <span style={{ color: activeTab == 1 ? "#896cef" : "#fff" }}>
                  Upcoming Matches
                </span>
              }
            />
          </Tabs>
        </div>
        <div style={{ padding: "16px 0" }}>
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
                  style={{ color: activeTabSport == 0 ? "#896cef" : "#fff" }}
                >
                  Cricket
                </span>
              }
            />
            <Tab
              value={1}
              label={
                <span
                  style={{ color: activeTabSport == 1 ? "#896cef" : "#fff" }}
                >
                  Soccer
                </span>
              }
            />
            <Tab
              value={2}
              label={
                <span
                  style={{ color: activeTabSport == 2 ? "#896cef" : "#fff" }}
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

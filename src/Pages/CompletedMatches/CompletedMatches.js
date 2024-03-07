import React, { useState,useEffect } from "react";
import Table from "../../Components/Table/Table";
import axios from "../../authAxios";
import { Tab, Tabs } from "@mui/material";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { MdOutlineClear } from "react-icons/md";
export default function CompletedMatches() {
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabSport, setActiveTabSport] = useState(0);
  const [value, onChange] = useState([new Date(), new Date()]);
  const [matches, setMatches] = useState([])
  const [sports_id, setSports_id] = useState(4)

  useEffect(() => {
    const fetchData = async () => {
        await getLiveMatches(sports_id);
    };

    fetchData();
  }, [activeTab, sports_id]);

  const getLiveMatches = async (sports_id) => {
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

  const columns = [
    {
      name: "ID",
      selector: (row) => row.matchObj.id,
    },
    {
      name: "PID",
      selector: (row) => "",
    },
    {
      name: "Title",
      selector: (row) =>  row.matchObj.name,
    },
    {
      name: "Sport",
      selector: (row) => row.sports,
    },
    {
      name: "Date",
      selector: (row) => row.matchObj.openDate,
    },
    {
      name: "Profit/ Loss",
      selector: (row) => row.profit_loss,
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
        <Table title="Completed Soccer Matches" data={matches} columns={columns} />
      );
    else if (activeTab == 1 && activeTabSport == 2)
      return (
        <Table title="Completed Tennis Matches" data={matches} columns={columns} />
      );
    else return <></>;
  };
  return (
    <div>
      <div style={{ padding: "16px 0" }}>
        {/* <div style={{backgroundColor:"white"}}> */}
          <DateRangePicker onChange={onChange} value={value} clearIcon={<MdOutlineClear color="white"  />} calendarIcon={<SlCalender color="white"/>} format={"dd-MM-y"}/>
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

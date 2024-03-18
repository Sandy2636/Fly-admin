import React, { useEffect, useState } from "react";
import Table from "../../../Components/Table/Table";
import axios from "../../../authAxios";

function InfoBox({ title, value }) {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #735cff 15%, white 15%)",
        width: "150px",
        borderRadius: "10px",
        padding: "15px 20px",
        margin: "5px",
        minWidth: "15rem",
      }}
    >
      <h6 style={{ color: "#64646B", margin: "5px 0px 0px 0px" }}>{title}</h6>
      <h3 style={{ fontWeight: "700", color: "black" }}>{value}</h3>
    </div>
  );
}
export default function SessionBetSlip() {
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [sessionBetsData, setSessionBetsData] = useState([]);

  const columns = [
    { name: "DATE", selector: (row) => row.date },
    { name: "Fancy ID", selector: (row) => row.fancy_id },
    { name: "Username", selector: (row) => row.user_name },
    { name: "Session Title", selector: (row) => row.session_title },
    { name: "RATE", selector: (row) => row.rate },
    { name: "RUNS", selector: (row) => row.runs },
    { name: "AMOUNT", selector: (row) => row.amount },
    { name: "MODE", selector: (row) => row.mode },
    { name: "No Position", selector: (row) => row.no_position },
    { name: "Yes Position", selector: (row) => row.yes_position },
    { name: "My Share", selector: (row) => row.my_share },
    { name: "No", selector: (row) => row.no_share },
    { name: "Yes", selector: (row) => row.yes_share },
    { name: "Status", selector: (row) => row.status },
    { name: "Plus / Minus", selector: (row) => row.settlement },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        style={{ outline: "none" }}
        placeholder="Search Here"
        onChange={(e) => setFilterText(e.target.value)}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const getSessionBet = async (req, res) => {
    try {
      const res = await axios.get("/analysis/getSessionBetSlips", {
        params: {
          user_id: localStorage.getItem("_id"),
          match_id: "33112585",
        },
      });
      if (res.data.status) {
        setSessionBetsData(res.data.dataobj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSessionBet();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <InfoBox title={"Total Bets"} value={""} />
        <InfoBox title={"Setted Bets"} value={""} />
        <InfoBox title={"Unsettled Bets"} value={""} />
        <InfoBox title={"Reverted Bets"} value={""} />
      </div>
      <div>
        <Table
          data={columns}
          columns={columns}
          title="Bet Slip"
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationResetDefaultPage={resetPaginationToggle}
        />
      </div>
    </div>
  );
}

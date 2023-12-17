import React, { useState } from "react";
import Table from "../../../Components/Table/Table";

export default function ProfiltAndLoss() {
  const [matches, setmatches] = useState(["a", "b"]);
  const columns = [
    {
      name: "Date/Time",
      selector: (row) => row.id,
    },
    {
      name: "Match Id",
      selector: (row) => row.pid,
    },
    {
      name: "Match Title",
      selector: (row) => row.title,
    },
    {
      name: "Match Earnings	",
      selector: (row) => row.sports,
    },
    {
      name: "Commision Plus",
      selector: (row) => row.date,
    },
    {
      name: "Commision Minus",
      selector: (row) => row.profit_loss,
    },
    {
      name: "Commision Earning",
      selector: (row) => row.profit_loss,
    },
    {
      name: "Total Earning",
      selector: (row) => row.profit_loss,
    },
  ];
  const data = [
    {
      id: 1,
      pid: "00",
      title: "India vs Pakistan",
      sports: "00",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
    },
    {
      id: 2,
      pid: "00",
      title: "India vs Pakistan",
      sports: "00",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
      profit_loss: "20",
    },
  ];
  return (
  
        // <div style={{ overflow: "scroll" }}>
          <Table  title="Profit and Loss" data={data} columns={columns} />
    // </div>
  );
}


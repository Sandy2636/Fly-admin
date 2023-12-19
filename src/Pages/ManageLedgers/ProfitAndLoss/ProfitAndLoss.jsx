import React, { useState } from "react";
import Table from "../../../Components/Table/Table";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
import 'jspdf-autotable';

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
    { id: 1, pid: "match1", title: "Match A", sports: 100, date: "2023-01-01", profit_loss: 50 },
    { id: 2, pid: "match2", title: "Match B", sports: 120, date: "2023-02-01", profit_loss: 60 },
    { id: 3, pid: "match3", title: "Match C", sports: 80, date: "2023-03-01", profit_loss: 30 },
    { id: 4, pid: "match4", title: "Match D", sports: 150, date: "2023-04-01", profit_loss: 75 },
    { id: 5, pid: "match5", title: "Match E", sports: 90, date: "2023-05-01", profit_loss: 45 },
    { id: 6, pid: "match6", title: "Match F", sports: 110, date: "2023-06-01", profit_loss: 55 },
    { id: 7, pid: "match7", title: "Match G", sports: 130, date: "2023-07-01", profit_loss: 65 },
    { id: 8, pid: "match8", title: "Match H", sports: 70, date: "2023-08-01", profit_loss: 25 },
    { id: 9, pid: "match9", title: "Match I", sports: 180, date: "2023-09-01", profit_loss: 90 },
    { id: 10, pid: "match10", title: "Match J", sports: 200, date: "2023-10-01", profit_loss: 100 },
    { id: 11, pid: "match11", title: "Match K", sports: 120, date: "2023-11-01", profit_loss: 60 },
    { id: 12, pid: "match12", title: "Match L", sports: 250, date: "2023-12-01", profit_loss: 125 },
    { id: 13, pid: "match13", title: "Match M", sports: 280, date: "2024-01-01", profit_loss: 140 },
    { id: 14, pid: "match14", title: "Match N", sports: 160, date: "2024-02-01", profit_loss: 80 },
    { id: 15, pid: "match15", title: "Match O", sports: 140, date: "2024-03-01", profit_loss: 70 },
  ];

  return (
    // <div style={{ overflow: "scroll" }}>
    <div>
      <div style={{backgroundColor:"#2B2D3A" ,borderRadius:'10px', padding:'8px 16px'}}>
        <h4>Summary</h4>
        <div style={{ display: "flex" }}>
          <p>All Time Total :</p>
          <p style={{fontWeight:600}}> 00</p>
        </div>
      </div>
      <DownloadPdf columns={columns} data={data} tableName={"Table Name"}/>
      <Table title="Earning Report" data={data} columns={columns} />
    </div>

    // </div>
  );
}

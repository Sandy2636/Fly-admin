import React from "react";
import Table from "../../../Components/Table/Table";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import jsPDF from 'jspdf';
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
function MyStatement() {
  const columns = [
    { name: "Date", selector: (row) => row.id },
    { name: "Description", selector: (row) => row.pid },
    { name: "Cr", selector: (row) => row.title },
    { name: "Dbt", selector: (row) => row.sports },
    { name: "Com+", selector: (row) => row.date },
    { name: "Com-", selector: (row) => row.profit_loss },
    { name: "Balance", selector: (row) => row.balance },
  ];
  
  const data = [
    { id: "2023-01-01", pid: "Transaction1", title: 0, sports: 50, date: 0, profit_loss: "Debit", balance: 50 },
    { id: "2023-01-02", pid: "Transaction2", title: 30, sports: 0, date: 0, profit_loss: "Credit", balance: 20 },
    { id: "2023-01-03", pid: "Transaction3", title: 0, sports: 20, date: 0, profit_loss: "Debit", balance: 40 },
    { id: "2023-01-04", pid: "Transaction4", title: 15, sports: 0, date: 0, profit_loss: "Credit", balance: 25 },
    // Add more data rows as needed
  ];
  return <div>
    <DownloadPdf columns={columns} data={data} tableName={"Table Name"}/>
    <Table title="Statement of User..." data={data} columns={columns}/>
  </div>;
}

export default MyStatement;

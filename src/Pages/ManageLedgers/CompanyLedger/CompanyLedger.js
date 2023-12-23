import React from 'react'
import Table from '../../../Components/Table/Table'
import DownloadPdf from '../../../Components/DownloadPdf/DownloadPdf';
import CSVGenerator from '../../../Components/CSVGenrator/CSVGenerator';
export default function CompanyLedger() {
  const columns = [
    { name: "DATE/TIME", selector: (row) => row.id },
    { name: "ENTRY", selector: (row) => row.pid },
    { name: "DEBIT", selector: (row) => row.title },
    { name: "CREDIT", selector: (row) => row.sports },
    { name: "BALANCE", selector: (row) => row.date },
    { name: "NOTE", selector: (row) => row.profit_loss },
  ];
  
  const data = [
    { id: "2023-01-01 10:00 AM", pid: "ENTRY1", title: 50, sports: 0, date: 50, profit_loss: "Initial Balance" },
    { id: "2023-01-02 02:30 PM", pid: "ENTRY2", title: 0, sports: 30, date: 20, profit_loss: "Credit from X" },
    { id: "2023-01-03 08:45 AM", pid: "ENTRY3", title: 20, sports: 0, date: 40, profit_loss: "Debit for Y" },
    { id: "2023-01-04 04:15 PM", pid: "ENTRY4", title: 0, sports: 15, date: 25, profit_loss: "Credit from Z" },
    // Add more data rows as needed
  ];
  
  const actionsMemo = React.useMemo(
    () => (
      <div style={{display:'flex', fontSize:'1rem'}}>
        <CSVGenerator columns={columns} data={data}/>
        <DownloadPdf columns={columns} data={data} tableName={"Table Name"} />
      </div>
    ),
    []
  );

   
  return (
    <div>
        <div>
            <Table title="Agent Ledger" data={data} columns={columns} actions={actionsMemo}/>
        </div>
    </div>
  )
}

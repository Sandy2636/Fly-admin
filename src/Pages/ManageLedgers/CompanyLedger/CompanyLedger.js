import React from 'react'
import Table from '../../../Components/Table/Table'

export default function CompanyLedger() {
    const columns = [
        {
          name: "DATE/TIME",
          selector: (row) => row.id,
        },
        {
          name: "ENTRY",
          selector: (row) => row.pid,
        },
        {
          name: "DEBIT",
          selector: (row) => row.title,
        },
        {
          name: "CREDIT",
          selector: (row) => row.sports,
        },
        {
          name: "BALANCE",
          selector: (row) => row.date,
        },
        {
          name: "NOTE",
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
  return (
    <div>
        <div>
            <Table title="Agent Ledger" data={data} columns={columns}/>
        </div>
    </div>
  )
}

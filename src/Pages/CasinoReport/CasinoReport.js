import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import { SlCalender } from "react-icons/sl";
// import "react-datepicker/dist/react-datepicker.css";
// import DateTimePicker from 'react-datetime-picker';
import Table from "../../Components/Table/Table";
// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function CasinoReport() {
  // const [value, onChange] = useState(new Date());
  const columns = [
    {
      name: "Title",
      selector: (row) => row.id,
    },
    {
      name: "Date",
      selector: (row) => row.pid,
    },
    {
      name: "Declared",
      selector: (row) => row.title,
    },
    {
      name: "Profit / Loss",
      selector: (row) => row.sports,
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
      {/* <DateTimePicker onChange={onChange} value={value} /> */}
      <Table  title="Casino Loss and Profit" data={data} columns={columns}/>
    </div>
  );
}

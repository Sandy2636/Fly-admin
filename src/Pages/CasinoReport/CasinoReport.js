import React, { useState } from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { SlCalender } from "react-icons/sl";
import { MdOutlineClear } from "react-icons/md";
import Table from "../../Components/Table/Table";

export default function CasinoReport() {
  const [value, onChange] = useState([new Date(), new Date()]);
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
       <DateRangePicker onChange={onChange} value={value} clearIcon={<MdOutlineClear color="white"  />} calendarIcon={<SlCalender color="white"/>} format={"dd-MM-y"}/>
      <Table  title="Casino Loss and Profit" data={data} columns={columns}/>
    </div>
  );
}

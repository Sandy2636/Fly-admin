import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { SlCalender } from "react-icons/sl";
import "react-datepicker/dist/react-datepicker.css";
import "./CasinoReport.css"
export default function CasinoReport() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div >
      <div>
        <div>
          <h6 style={{color:'white'}}>Start Date:</h6>
          <div
            style={{
              display: "inline-block",
              border: "1px solid grey",
              padding: "5px 5px",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <span>{<SlCalender color="white"/>}</span>
          </div>
        </div>
        <div>
          <h6 style={{color:'white'}}>End Date:</h6>
          <div
            style={{
              display: "inline-block",
              border: "1px solid grey",
              padding: "5px 5px",
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <span>{<SlCalender color="white"/>}</span>
          </div>
        </div>
        <button style={{margin:"10px 0px"}} type="button" class="btn btn-success">
          Success
        </button>
      </div>
      <div style={{overflow:"scroll"}}>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Cr</th>
            <th scope="col">Dbt</th>
            <th scope="col">Com+</th>
            <th scope="col">Com-</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">05 Dec 23</th>
            <td>Mark</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
          </tr>
          <tr>
            <th scope="row">05 Dec 23</th>
            <td>Jacob</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
            <td>00</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

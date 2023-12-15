import React,{useState} from 'react'
import "./BlockSport.css"
import { useNavigate, useParams } from "react-router-dom";

export default function BlockSport() {
    const params = useParams();
    const navigate = useNavigate();
    const [matches, setmatches] = useState(["a", "b"]);
  return (
    <div>
        <h5 style={{color:"white"}}>List</h5>
         <div style={{ overflow: "scroll" }}>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">So.</th>
              <th scope="col">BetfairId</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((item) => {
              return (
                <tr>
                  <th scope="row">05 Dec 23</th>
                  <td onClick={() => navigate("/ledger/" + item)}>Mark</td>
                  <td>00</td>
                  <td>00</td>
                  <td>00</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

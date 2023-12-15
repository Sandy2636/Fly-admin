import React,{useState} from 'react'
import "./LiveMatches.css"
import { useNavigate, useParams } from "react-router-dom";
export default function LiveMatches() {
        const params = useParams();
        const navigate = useNavigate();
        const [matches, setmatches] = useState(["a", "b"]);
  return (
    <div>
         <div style={{ overflow: "scroll" }}>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">PID</th>
              <th scope="col">Title</th>
              <th scope="col">Sport</th>
              <th scope="col">Date</th>
              <th scope="col">Profit/Loss</th>
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

import React from 'react'
import "./Reports.css"
import { useNavigate, useParams,Link } from "react-router-dom";

export default function Reports() {
    const navigate = useNavigate();
    const {match_id} = useParams();
    
  return (
    <div>
        <div  style={{justifyContent:"center" ,display:"flex"}}>
            <button onClick={()=>{navigate("/live-matches/reports/"+match_id+"/live-report")}} className='rptBtn'>Live Report</button>
            <button onClick={()=>{navigate("/live-matches/reports/"+match_id+"/sessionbet-slip")}} className='rptBtn'>Session Report</button>
        </div>
    </div>
  )
}

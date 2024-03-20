import React,{useState} from 'react'
import "./Reports.css"
import { useNavigate, useParams,Link,useLocation } from "react-router-dom";

export default function Reports() {
    const navigate = useNavigate();
    const {match_id} = useParams();
    const location = useLocation();
    const [backPath, setbackPath] = useState(location.pathname.split("/")[1])
    
  return (
    <div>
        <div  style={{justifyContent:"center" ,display:"flex"}}>
            <button onClick={()=>{navigate("/"+ backPath +"/reports/"+match_id+"/live-report")}} className='rptBtn'>Live Report</button>
            <button onClick={()=>{navigate("/"+ backPath + "/reports/"+match_id+"/sessionbet-slip")}} className='rptBtn'>Session Report</button>
        </div>
    </div>
  )
}

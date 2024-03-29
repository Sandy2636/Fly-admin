import React,{useEffect, useState} from "react";
import axios from "../../authAxios";
function InfoBox({ title, value }) {
  
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #735cff 15%, white 15%)",
        width: "32%",
        borderRadius: "10px",
        padding: "15px 20px",
        marginBottom: "20px",
        minWidth: "15rem",
      }}
    >
      <h6 style={{ color: "#64646B", margin: "5px 0px 0px 0px" }}>{title}</h6>
      <h3 style={{ fontWeight: "700", color: "black" }}>{value}</h3>
    </div>
  );
}
export default function Dashboard() {

  const [userData, setUserData] = useState()
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get("/users/get-user", {
        params: { username: localStorage.getItem("userName") }
      });
      setUserData(response.data.user);
      console.log(response.data.user)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const getDate = (odate)=>{
      let str = odate.createdAt;
      return str.slice(0,10);
  }
  return (
    <div>
      <div>
        <h5 style={{ color: "white" }}>Welcome,</h5>
        <h1 style={{ color: "white" }}>{localStorage.getItem("userName")}</h1>
      </div>
      <div>
        <p style={{ color: "#BCBCBF" }}>User Information</p>
        {/* <div>
          <h4>Welcome to,</h4>
          <h1>Flybet9</h1>
        </div> */}
        <div style={{ backgroundColor: "#2B2D3A", borderRadius: "15px" }}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            
            <InfoBox title={"My Username"} value={userData?.username} />
            <InfoBox title={"My Level"} value={userData?.user_type} />
            <InfoBox title={"MY FIX LIMIT"} value={userData?.credits} />
            <InfoBox title={"Created At"} value={getDate(userData)} />
            <InfoBox title={"Maximum My Share"} value={userData?.my_match_share} />
            <InfoBox title={"Minimum Company Share"} value={userData?.other_match_share} />
            <InfoBox title={"Match Commission"} value={userData?.match_commission} />
            <InfoBox title={"Session Commission"} value={userData?.session_commission} />
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
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
  return (
    <div>
      <div>
        <h5 style={{ color: "white" }}>Welcome,</h5>
        <h1 style={{ color: "white" }}>{localStorage.getItem("userName")}</h1>
      </div>
      <div>
        {/* <p style={{ color: "#BCBCBF" }}>User Information</p> */}
        {/* <div>
          <h4>Welcome to,</h4>
          <h1>Flybet9</h1>
        </div> */}
        {/* <div style={{ backgroundColor: "#2B2D3A", borderRadius: "15px" }}>
          <div
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
            <InfoBox title={"Level"} value={"Super Stockist"} />
          </div>
        </div> */}
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function CollectionReport() {
  return (
    <div  style={{display:"flex",flexWrap:'wrap',justifyContent:'space-around',  backgroundColor:'#2B2D3A',padding:'8px 16px'}}>
        <InfoTable />
        <InfoTable />
        <InfoTable />
    </div>
  );
}
const InfoTable = () => {
  const [matches, setmatches] = useState(["a", "b"]);
  return (
    <div
      style={{
        border: "1px solid #735cff",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        marginRight:'10px',
        marginBottom:'10px',
        width:"100%",
        // minWidth:"1rem",
        maxWidth:'23rem'
       
      }}
    >
      <div
        style={{
          background: "#735cff",
          padding: "10px ",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <p style={{ color: "white", margin: "0px" }}>
          PAYMENT RECEIVING FROM(lene hai)
        </p>
      </div>

      <div>
        <div style={{ overflow: "scroll" }}>
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((item) => {
                return (
                  <tr>
                    <td>00</td>
                    <td>00</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

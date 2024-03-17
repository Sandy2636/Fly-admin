import React,{useState} from 'react'
import Table from "../../../Components/Table/Table";

function InfoBox({ title, value }) {
    return (
      <div
        style={{
          background: "linear-gradient(to bottom, #735cff 15%, white 15%)",
          width: "150px",
          borderRadius: "10px",
          padding: "15px 20px",
          margin: "5px",
          minWidth: "15rem",
        }}
      >
        <h6 style={{ color: "#64646B", margin: "5px 0px 0px 0px" }}>{title}</h6>
        <h3 style={{ fontWeight: "700", color: "black" }}>{value}</h3>
      </div>
    );
  }
export default function SessionBetSlip() {

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [filterText, setFilterText] = useState("");
    const columns = [
        { name: "DATE", selector: (row) => row._id },
        { name: "User", selector: (row) => row.username },
        { name: "Session Title", selector: (row) => row.first_name },
        { name: "RATE", selector: (row) => row.fix_limit },
        { name: "RUNS", selector: (row) => row.my_share },
        { name: "AMOUNT", selector: (row) => row.max_share },
        { name: "MODE", selector: (row) => row.exposure },
        { name: "bet No", selector: (row) => row.exposure },
        { name: "bet Yes", selector: (row) => row.exposure },
        { name: "My Share", selector: (row) => row.exposure },
        { name: "No", selector: (row) => row.exposure },
        { name: "Status", selector: (row) => row.exposure },
        { name: "Plus / Minus", selector: (row) => row.exposure },
      ];
      const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
          if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
          }
        };
    
        return (
          <input
            style={{ outline: "none" }}
            placeholder="Search Here"
            onChange={(e) => setFilterText(e.target.value)}
            filterText={filterText}
          />
        );
      }, [filterText, resetPaginationToggle]);
     
  return (
    <div>
        <div style={{display:"flex",flexWrap:'wrap' }}>
            <InfoBox title={"Total Bets"} value={""}/>
            <InfoBox title={"Setted Bets"} value={""}/>
            <InfoBox title={"Unsettled Bets"} value={""}/>
            <InfoBox title={"Reverted Bets"} value={""}/>
        </div>
        <div>
        <Table
          data={columns}
          columns={columns}
          title="Bet Slip"
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationResetDefaultPage={resetPaginationToggle}
        />
        </div>
    </div>
  )
}

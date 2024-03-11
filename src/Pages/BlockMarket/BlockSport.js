import React, { useState, useEffect } from "react";
import "jspdf-autotable";
import Table from "../../Components/Table/Table";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import axios from "../../authAxios";

const BlockSport = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [colData, setColData] = useState([]);
  const [game, setdata] = useState([]);
  const [btnClickFlag, setBtnClickFlag] = useState(false); 
  const handleBtnClick = async (_id, status) => {
    try {
      var response = await axios.patch("game/updateStatus", { _id, status });
      alert(response.data.msg);
      setBtnClickFlag(!btnClickFlag); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/game/getGames", {});
        setdata(result.data.dataobj);
        setColData(result.data.data.dataobj);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [btnClickFlag]); // Include btnClickFlag in the dependency array

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

  const columns = [
    { name: "So", selector: (row) => row._id },
    { name: "BetfairId", selector: (row) => row.gId },
    { name: "Name", selector: (row) => row.gName },
    { name: "Status", selector: (row) => (row.block ? row.gName + " is block" : row.gName + " is Unblock") },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: 'flex', justifyContent: "space-between" }}>
          <button onClick={() => handleBtnClick(row._id, !row.block)}>{row.block ? "Unblock" : "Block"}</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div>
        <Table
          data={game}
          columns={columns}
          title="Games"
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationResetDefaultPage={resetPaginationToggle}
        />
      </div>
    </div>
  );
};

export default BlockSport;

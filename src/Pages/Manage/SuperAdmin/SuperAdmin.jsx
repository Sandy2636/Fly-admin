import React, { useState,useEffect } from "react";
import "jspdf-autotable";
import ClientList from "../../../Components/ClientList/ClientList";
import Table from "../../../Components/Table/Table";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
import CSVGenerator from "../../../Components/CSVGenrator/CSVGenerator";
import { useNavigate, useParams } from "react-router-dom";
import { FaIcons, FaUserEdit } from "react-icons/fa";
import axios from "axios";
const SuperAdmin = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [colData, setColData] = useState([]);
  const [data, setdata] = useState([]);

  const editBtnClick = (_id, row) => {
    navigate(`/manage/update-user/${_id}`);
    console.log(_id);
    console.log(row);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/users/get-users", {
          params: { user_type: "Super Admin" },
        });
  
        setdata(result.data.data);
        console.log(data)
        setColData(filterData(filterText));
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
    
    function filterData(searchQuery) {
      const query = searchQuery.toLowerCase();
      const result = data?.filter((user) => {
        return Object.values(user).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(query)
        );
      });

      return result;
    }
    setColData(filterData(filterText));
  }, [filterText]);

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
    { name: "ID", selector: (row) => row.id },
    { name: "UserName", selector: (row) => row.username },
    { name: "Name", selector: (row) => row.first_name },
    { name: "FixLimit", selector: (row) => row.fix_limit },
    { name: "MyShare", selector: (row) => row.my_share },
    { name: "MaxShare", selector: (row) => row.max_share },
    { name: "Exposure", selector: (row) => row.exposure },
    {
      name: "Actions",
      cell: (row) => (
        <div onClick={() => editBtnClick(row.username, row)}>
          <FaUserEdit size={18} />
        </div>
      ),
    },
  ];
  const actionsMemo = React.useMemo(
    () => (
      <div style={{ display: "flex", fontSize: "1rem" }}>
        <button
          onClick={() => {
            navigate("/manage/super-admin/create-user");
          }}
          style={{
            backgroundColor: "#896CEF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            margin: "0px 5px",
          }}
        >
          Create Super Admin
        </button>
        <CSVGenerator columns={columns} data={colData} />
        <DownloadPdf
          columns={columns}
          data={colData}
          tableName={"Table Name"}
        />
      </div>
    ),
    []
  );
 return (
    <div>
      {/* <div style={{display:'flex'}}>
        <DownloadPdf
          columns={columns}
          data={colData}
          tableName={"Super Stockist"}
        />
        <CSVGenerator columns={columns} data={colData} />
      </div> */}
      <div>
        <Table
          data={colData}
          columns={columns}
          title="Manage Super Admin"
          pagination
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationResetDefaultPage={resetPaginationToggle}
          actions={actionsMemo}
        />
      </div>
    </div>
  );
};
export default SuperAdmin;

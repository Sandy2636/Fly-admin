import React, { useState, useEffect } from "react";
import "jspdf-autotable";
import ClientList from "../../../Components/ClientList/ClientList";
import Table from "../../../Components/Table/Table";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
import CSVGenerator from "../../../Components/CSVGenrator/CSVGenerator";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import axios from "../../../authAxios";

const Agent = () => {
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

  const changePassBtnClick = (_id, row) => {
    navigate(`/manage/change-password/${_id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/users/get-users", {
          params: { user_type: "agent", user_id: localStorage.getItem("_id") },
        });
        setdata(result.data.data);
        setColData(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
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

    // Use filtered data in the Table component
    setColData(filterData(filterText));
  }, [filterText, data]);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <input
        style={{ outline: "none", maxWidth: "100%" }}
        placeholder="Search Here"
        onChange={(e) => setFilterText(e.target.value)}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    { name: "ID", selector: (row) => row._id },
    { name: "UserName", selector: (row) => row.username },
    { name: "Name", selector: (row) => row.first_name },
    { name: "FixLimit", selector: (row) => row.fix_limit },
    { name: "MyShare", selector: (row) => row.other_match_share },
    { name: "MaxShare", selector: (row) => row.my_match_share },
    { name: "Exposure", selector: (row) => row.exposure },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ margin: "0px 4px" }}
            onClick={() => editBtnClick(row.username, row)}
          >
            <FaUserEdit size={18} />
          </div>
          <div
            style={{ margin: "0px 4px" }}
            onClick={() => changePassBtnClick(row.username, row)}
          >
            <TbPasswordUser size={18} />
          </div>
        </div>
      ),
    },
  ];

  const actionsMemo = React.useMemo(
    () => (
      <div style={{ display: "flex", fontSize: "1rem" }}>
        <button
          onClick={() => {
            navigate("/manage/agent/create-user");
          }}
          style={{
            backgroundColor: "#896CEF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            margin: "0px 5px",
          }}
        >
          Create Agent
        </button>
        <CSVGenerator columns={columns} data={colData} />
        <DownloadPdf
          columns={columns}
          data={colData}
          tableName={"Table Name"}
        />
      </div>
    ),
    [navigate, colData, columns]
  );

  return (
    <div>
      <div>
        <Table
          data={colData}
          columns={columns}
          title="Manage Agent"
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

export default Agent;

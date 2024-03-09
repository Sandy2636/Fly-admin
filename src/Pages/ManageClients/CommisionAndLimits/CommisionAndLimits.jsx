import React, { useState } from "react";
import Table from "../../../Components/Table/Table";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
import CSVGenerator from "../../../Components/CSVGenrator/CSVGenerator";
import { useNavigate } from "react-router-dom";
import axios from "../../../authAxios";
import { FaDeploydog, FaUserEdit } from "react-icons/fa";
import { TbPasswordUser } from "react-icons/tb";
import { Settings } from "@mui/icons-material";
import Swal from "sweetalert2";
// import { useHistory } from 'react-router-dom';
function CommisionAndLimits() {
  const navigate = useNavigate();
  // const history = useHistory();
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [colData, setColData] = React.useState([]);
  const [data, setData] = useState([]);

  const getCommissionAndLimit = async () => {
    try {
      let res = await axios.get("/users/getCommissionAndLimit");
      if (res.data.status) {
        setData(res.data.dataobj);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    getCommissionAndLimit();
  }, []);

  React.useEffect(() => {
    function filterData(searchQuery) {
      // Convert the search query to lowercase for case-insensitive matching
      const query = searchQuery.toLowerCase();

      // Use the filter method to find matching objects
      const result = data.filter((user) => {
        // Check if any of the fields contain the search query
        return Object.values(user).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(query)
        );
      });

      return result;
    }
    setColData(filterData(filterText));
  }, [filterText, data]);

  const depositBalanceToUser = async (amount, deposit_to, deposited_by) => {
    try {
      const res = await axios.post("/users/deposit", {
        amount,
        deposit_to,
        deposited_by,
      });
      if (res.data.status) {
        Swal.fire({
          text: "Amount Deposited!",
          timer: 2000,
          icon: "success",
        });
        getCommissionAndLimit();
      } else {
        Swal.fire({
          icon: "error",
          text: res.data.msg,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong! please contact admin.",
      });
    }
  };

  const withdrawBalanceFromUser = async (
    amount,
    withdraw_from,
    withdrawn_by
  ) => {
    try {
      const res = await axios.post("/users/withdraw", {
        amount,
        withdraw_from,
        withdrawn_by,
      });
      if (res.data.status) {
        Swal.fire({
          text: "Amount Withdrown!",
          timer: 2000,
          icon: "success",
        });
        getCommissionAndLimit();
      } else {
        Swal.fire({
          icon: "error",
          text: res.data.msg,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        text: "Something went wrong! please contact admin.",
      });
    }
  };
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
  const limitsColumn = [
    { name: "Current Limit", selector: (row) => row.credits },
    { name: "Down Limit", selector: (row) => row.down_limit },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              margin: "0 2px",
              borderRadius: 4,
              backgroundColor: "lightblue",
              padding: "4px",
              aspectRatio: 1,
              width: 30,
            }}
            onClick={() => {
              Swal.fire({
                title: "Deposit Balance to User",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                background: "#2b2d3a",
                color: "#fff",
                showCancelButton: true,
                confirmButtonText: "Deposit",
                showLoaderOnConfirm: true,
                preConfirm: (amount) => {
                  depositBalanceToUser(
                    amount,
                    row._id,
                    localStorage.getItem("_id")
                  );
                }, //THIS FUNCTION IS CALLED FIRST
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            D
          </div>
          <div
            style={{
              margin: "0 2px",
              borderRadius: 4,
              backgroundColor: "red",
              padding: "4px",
              aspectRatio: 1,
              width: 30,
            }}
            onClick={() => {
              Swal.fire({
                title: "Withdraw Balance from User",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                background: "#2b2d3a",
                color: "#fff",
                showCancelButton: true,
                confirmButtonText: "Withdraw",
                showLoaderOnConfirm: true,
                preConfirm: (amount) => {
                  withdrawBalanceFromUser(
                    amount,
                    row._id,
                    localStorage.getItem("_id")
                  );
                }, //THIS FUNCTION IS CALLED FIRST
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }}
          >
            W
          </div>
          <div
            style={{
              margin: "0 2px",
              borderRadius: 4,
              backgroundColor: "purple",
              padding: "4px",
              aspectRatio: 1,
              width: 30,
            }}
            // onClick={() => changePassBtnClick(row.username, row)}
          >
            <Settings size={18} />
          </div>
        </div>
      ),
    },
  ];

  const commissionColumn = [
    { name: "Client Name", selector: (row) => row.username },
    { name: "Match Comm.", selector: (row) => row.match_commission },
    { name: "Session Comm.", selector: (row) => row.session_commission },
  ];
  const actionsMemo = React.useMemo(
    () => (
      <div style={{ display: "flex", fontSize: "1rem" }}>
        {/* <button onClick={()=>{navigate('/manage/punter/create-user')}} style={{backgroundColor:"#896CEF",color:'white', border:'none', borderRadius:'5px',margin:'0px 5px' }}>Create New User</button> */}
        {/* <CSVGenerator columns={columns} data={colData} /> */}
        {/* <DownloadPdf
          columns={columns}
          data={colData}
          tableName={"Table Name"}
        /> */}
      </div>
    ),
    []
  );
  const parentColumns = [
    {
      name: "Parent Column 1",
      selector: "parentColumn1",
      sortable: true,
    },
    {
      name: "Parent Column 2",
      selector: "parentColumn2",
      sortable: true,
    },
  ];

  const childColumns = [
    {
      name: "Child Column 1",
      selector: "childColumn1",
      sortable: true,
    },
    {
      name: "Child Column 2",
      selector: "childColumn2",
      sortable: true,
    },
  ];

  const TableElement = ({ commissionData, title, limitsData }) => {
    return (
      <div
        style={{
          backgroundColor: "#2b2d3a",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px 0",
          overflowX: "auto",
        }}
      >
        <span style={{ padding: "16px 0", fontSize: 18 }}>{title}</span>
        <br />
        <br />
        <table
          style={{
            textAlign: "center",
            width: "96%",
            backgroundColor: "#2b2d3a",
            border: "1px solid #fff",
            borderRadius: 8,
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "16px 0 0 0" }}>Client Commission</th>
              <th style={{ padding: "16px 0 0 0" }}>Client Limit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Table data={commissionData} columns={commissionColumn} />
              </td>
              <td>
                <Table data={limitsData} columns={limitsColumn} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div>
      <TableElement
        title={"Super Stockist"}
        commissionData={colData.filter(
          (user) => user.user_type == "super_stockist"
        )}
        limitsData={colData.filter(
          (user) => user.user_type == "super_stockist"
        )}
      />
      <TableElement
        title={"Stockist"}
        commissionData={colData.filter((user) => user.user_type == "stockist")}
        limitsData={colData.filter((user) => user.user_type == "stockist")}
      />
      <TableElement
        title={"Agent"}
        commissionData={colData.filter((user) => user.user_type == "agent")}
        limitsData={colData.filter((user) => user.user_type == "agent")}
      />
      <TableElement
        title={"All Users"}
        commissionData={colData}
        limitsData={colData}
      />
      {/* <div
        style={{
          backgroundColor: "#2b2d3a",
          borderRadius: "8px",
          padding: "16px",
          margin: "16px 0",
          overflowX: "auto",
        }}
      >
        <span style={{ padding: "16px 0", fontSize: 18 }}>Summary</span>
        <Table data={colData} columns={limitsColumn} />
      </div> */}
    </div>
  );
}

export default CommisionAndLimits;

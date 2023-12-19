import React from "react";
import "jspdf-autotable";
import ClientList from "../../../Components/ClientList/ClientList";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
const ManageSuperStockist = () => {
  const data = {
    columns: [
      { label: "ID", field: "ID", sort: "asc", width: 100 },
      { label: "UserName", field: "UserName", sort: "asc", width: 150 },
      { label: "Name", field: "Name", sort: "asc", width: 200 },
      { label: "FixLimit", field: "FixLimit", sort: "asc", width: 150 },
      { label: "MyShare", field: "MyShare", sort: "asc", width: 150 },
      { label: "MaxShare", field: "MaxShare", sort: "asc", width: 150 },
      { label: "Exposure", field: "Exposure", sort: "asc", width: 150 },
      { label: "Actions", field: "Actions", sort: "asc", width: 100 },
    ],
    rows: [
      {
        ID: 1,
        UserName: "user1",
        Name: "John Doe",
        FixLimit: 10000,
        MyShare: 5000,
        MaxShare: 8000,
        Exposure: 3000,
        Actions: "Edit",
      },
      {
        ID: 2,
        UserName: "user2",
        Name: "Jane Doe",
        FixLimit: 15000,
        MyShare: 7000,
        MaxShare: 10000,
        Exposure: 4000,
        Actions: "Delete",
      },
      {
        ID: 3,
        UserName: "user3",
        Name: "Alice Johnson",
        FixLimit: 12000,
        MyShare: 6000,
        MaxShare: 9000,
        Exposure: 3500,
        Actions: "Edit",
      },
      {
        ID: 4,
        UserName: "user4",
        Name: "Bob Smith",
        FixLimit: 18000,
        MyShare: 8500,
        MaxShare: 12000,
        Exposure: 5000,
        Actions: "Delete",
      },
      {
        ID: 5,
        UserName: "user5",
        Name: "Eva Brown",
        FixLimit: 20000,
        MyShare: 9500,
        MaxShare: 15000,
        Exposure: 6000,
        Actions: "Edit",
      },
      {
        ID: 6,
        UserName: "user6",
        Name: "Chris Wilson",
        FixLimit: 13000,
        MyShare: 7000,
        MaxShare: 11000,
        Exposure: 4500,
        Actions: "Delete",
      },
      {
        ID: 7,
        UserName: "user7",
        Name: "Grace Miller",
        FixLimit: 16000,
        MyShare: 8000,
        MaxShare: 13000,
        Exposure: 5500,
        Actions: "Edit",
      },
      {
        ID: 8,
        UserName: "user8",
        Name: "Daniel Lee",
        FixLimit: 14000,
        MyShare: 7500,
        MaxShare: 10000,
        Exposure: 4800,
        Actions: "Delete",
      },
      {
        ID: 9,
        UserName: "user9",
        Name: "Olivia White",
        FixLimit: 17000,
        MyShare: 8800,
        MaxShare: 12000,
        Exposure: 5200,
        Actions: "Edit",
      },
      {
        ID: 10,
        UserName: "user10",
        Name: "Michael Davis",
        FixLimit: 19000,
        MyShare: 9200,
        MaxShare: 14000,
        Exposure: 5800,
        Actions: "Delete",
      },
      {
        ID: 11,
        UserName: "user11",
        Name: "Sophia Taylor",
        FixLimit: 11000,
        MyShare: 5500,
        MaxShare: 8500,
        Exposure: 3200,
        Actions: "Edit",
      },
      {
        ID: 12,
        UserName: "user12",
        Name: "Matthew Brown",
        FixLimit: 22000,
        MyShare: 10500,
        MaxShare: 16000,
        Exposure: 7000,
        Actions: "Delete",
      },
      {
        ID: 13,
        UserName: "user13",
        Name: "Ava Wilson",
        FixLimit: 25000,
        MyShare: 12000,
        MaxShare: 18000,
        Exposure: 8000,
        Actions: "Edit",
      },
      {
        ID: 14,
        UserName: "user14",
        Name: "Ryan Harris",
        FixLimit: 20000,
        MyShare: 9500,
        MaxShare: 15000,
        Exposure: 6000,
        Actions: "Delete",
      },
      {
        ID: 15,
        UserName: "user15",
        Name: "Emma Rodriguez",
        FixLimit: 18000,
        MyShare: 8500,
        MaxShare: 13000,
        Exposure: 5500,
        Actions: "Edit",
      },
    ],
  };

  return (
    <div>
      <DownloadPdf
        columns={data.columns}
        data={data.rows}
        tableName={"Super Stockist"}
      />
      <ClientList data={data} />
    </div>
  );
};
export default ManageSuperStockist;

import React from "react";
import Table from "../../../Components/Table/Table";

function ManageStockist() {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [colData, setColData] = React.useState([]);

  React.useEffect(() => {
    const data = [
      {
        id: 1,
        username: "user1",
        name: "John Doe",
        fix_limit: 10000,
        my_share: 5000,
        max_share: 8000,
        exposure: 3000,
        actions: "Edit",
      },
      {
        id: 2,
        username: "user2",
        name: "Jane Doe",
        fix_limit: 15000,
        my_share: 7000,
        max_share: 10000,
        exposure: 4000,
        actions: "Delete",
      },
      {
        id: 3,
        username: "user3",
        name: "Alice Johnson",
        fix_limit: 12000,
        my_share: 6000,
        max_share: 9000,
        exposure: 3500,
        actions: "Edit",
      },
      {
        id: 4,
        username: "user4",
        name: "Bob Smith",
        fix_limit: 18000,
        my_share: 8500,
        max_share: 12000,
        exposure: 5000,
        actions: "Delete",
      },
      {
        id: 5,
        username: "user5",
        name: "Eva Brown",
        fix_limit: 20000,
        my_share: 9500,
        max_share: 15000,
        exposure: 6000,
        actions: "Edit",
      },
      {
        id: 6,
        username: "user6",
        name: "Chris Wilson",
        fix_limit: 13000,
        my_share: 7000,
        max_share: 11000,
        exposure: 4500,
        actions: "Delete",
      },
      {
        id: 7,
        username: "user7",
        name: "Grace Miller",
        fix_limit: 16000,
        my_share: 8000,
        max_share: 13000,
        exposure: 5500,
        actions: "Edit",
      },
      {
        id: 8,
        username: "user8",
        name: "Daniel Lee",
        fix_limit: 14000,
        my_share: 7500,
        max_share: 10000,
        exposure: 4800,
        actions: "Delete",
      },
      {
        id: 9,
        username: "user9",
        name: "Olivia White",
        fix_limit: 17000,
        my_share: 8800,
        max_share: 12000,
        exposure: 5200,
        actions: "Edit",
      },
      {
        id: 10,
        username: "user10",
        name: "Michael Davis",
        fix_limit: 19000,
        my_share: 9200,
        max_share: 14000,
        exposure: 5800,
        actions: "Delete",
      },
      {
        id: 11,
        username: "user11",
        name: "Sophia Taylor",
        fix_limit: 11000,
        my_share: 5500,
        max_share: 8500,
        exposure: 3200,
        actions: "Edit",
      },
      {
        id: 12,
        username: "user12",
        name: "Matthew Brown",
        fix_limit: 22000,
        my_share: 10500,
        max_share: 16000,
        exposure: 7000,
        actions: "Delete",
      },
      {
        id: 13,
        username: "user13",
        name: "Ava Wilson",
        fix_limit: 25000,
        my_share: 12000,
        max_share: 18000,
        exposure: 8000,
        actions: "Edit",
      },
      {
        id: 14,
        username: "user14",
        name: "Ryan Harris",
        fix_limit: 20000,
        my_share: 9500,
        max_share: 15000,
        exposure: 6000,
        actions: "Delete",
      },
      {
        id: 15,
        username: "user15",
        name: "Emma Rodriguez",
        fix_limit: 18000,
        my_share: 8500,
        max_share: 13000,
        exposure: 5500,
        actions: "Edit",
      },
    ];
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
    { name: "Name", selector: (row) => row.name },
    { name: "FixLimit", selector: (row) => row.fix_limit },
    { name: "MyShare", selector: (row) => row.my_share },
    { name: "MaxShare", selector: (row) => row.max_share },
    { name: "Exposure", selector: (row) => row.exposure },
    { name: "Actions", selector: (row) => row.actions },
  ];

  return (
    <div>
      <Table
        data={colData}
        columns={columns}
        title="Manage Stockist"
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        paginationResetDefaultPage={resetPaginationToggle}
      />
    </div>
  );
}

export default ManageStockist;

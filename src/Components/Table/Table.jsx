import React from "react";
import DataTable, { createTheme } from "react-data-table-component";

function Table({ data, columns, title = "", ...rest }) {
  createTheme(
    "solarized",
    {
      text: {
        primary: "#fff",
        secondary: "#2aa198",
      },
      background: {
        default: "#2b2d3a",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#fff",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  return (
    <div
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        margin: "8px 0",
        backgroundColor: "#2b2d3a",
      }}
    >
      <DataTable
        title={title}
        data={data}
        columns={columns}
        theme="solarized"
        {...rest}
      />
    </div>
  );
}

export default Table;

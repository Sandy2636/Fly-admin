import React, { useState } from "react";
import Table from "../../../Components/Table/Table";
import { Tab, Tabs } from "@mui/material";
import { usePDF } from "react-to-pdf";
import CSVGenerator from "../../../Components/CSVGenrator/CSVGenerator";
import DownloadPdf from "../../../Components/DownloadPdf/DownloadPdf";
export default function CollectionReport() {
  const [activeTab, setActiveTab] = useState(1);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [activeTabSport, setActiveTabSport] = useState(0);
  const columns = [
    {
      name: "Client",
      selector: (row) => row.id,
    },
    {
      name: "Balance",
      selector: (row) => row.pid,
    },
  ];

  const data = [
    {
      id: 1,
      pid: "idk",
    },
    {
      id: 2,
      pid: "idk",
    },
  ];
  const actionsMemo = React.useMemo(
    () => (
      <div style={{display:'flex', fontSize:'1rem'}}>
        <CSVGenerator columns={columns} data={data}/>
        <DownloadPdf columns={columns} data={data} tableName={"Table Name"} />
      </div>
    ),
    []
  );
  const returnCurrentTabTable = () => {
   
    if (activeTab == 1 && activeTabSport == 0)
      return (
        <Table
          title="PAYMENT RECEIVING FROM (Lena hai)"
          data={data}
          columns={columns}
          actions={actionsMemo}
        />
      );
    else if (activeTab == 1 && activeTabSport == 1)
      return (
        <Table
          title="PAYMENT PAID TO (Dena hai)"
          data={data}
          columns={columns}
          actions={actionsMemo}
        />
      );
    else if (activeTab == 1 && activeTabSport == 2)
      return (
        <Table
          title="PAYMENT CLAER (Clear hai)"
          data={data}
          columns={columns}
          actions={actionsMemo}
        />
      );
    else return <></>;
  };

//   const options = {
//     method: 'open',
//     resolution: Resolution.HIGH,
//     page: {
//        margin: Margin.SMALL,
//        format: 'a4',
//        orientation: 'portrait',
//     },
//     canvas: {
//        mimeType: 'image/png',
//        qualityRatio: 1
//     },
//     overrides: {
//        pdf: {
//           compress: true
//        },
//        canvas: {
//           useCORS: true
//        }
//     },
//  };
 const getTargetElement = () => document.getElementById('content-id');

  return (
    <div>
      <div style={{ padding: "16px 0" }}>
        <Tabs
          value={activeTabSport}
          sx={{
            ".Mui-selected": {
              color: `#fff`,
              outline: "none",
            },
            "&:hover": {
              outline: "none",
            },
          }}
          TabIndicatorProps={{ style: { background: "#896cef" } }}
          aria-label="tabs example"
          onChange={(e, newVal) => {
            setActiveTabSport(newVal);
          }}
        >
          <Tab
            value={0}
            label={
              <span style={{ color: activeTabSport == 0 ? "#896cef" : "#fff" }}>
                Lena hai
              </span>
            }
          />
          <Tab
            value={1}
            label={
              <span style={{ color: activeTabSport == 1 ? "#896cef" : "#fff" }}>
                Dena hai
              </span>
            }
          />
          <Tab
            value={2}
            label={
              <span style={{ color: activeTabSport == 2 ? "#896cef" : "#fff" }}>
                Clear hai
              </span>
            }
          />
        </Tabs>
      </div>
      <div>
        {/* <button style={{color:"red"}} onClick={() => generatePDF(getTargetElement, options)}>Download PDF</button> */}
        <div id="content-id">{returnCurrentTabTable()}</div>
      </div>
    </div>
  );
}


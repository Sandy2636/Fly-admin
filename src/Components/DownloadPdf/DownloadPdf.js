import React from "react";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import jsPDF from "jspdf";
import { FaFilePdf } from "react-icons/fa";


export default function DownloadPdf({columns,data,tableName}) {
    const generatePDF = (columns, data, tableName) => {
        const pdfDoc = new jsPDF();
      
        const rows = data.map((row) => Object.values(row));
      
        pdfDoc.text('Table Report', 14, 10); 
        pdfDoc.text(`Table: ${tableName}`, 14, 20);
      
        
        pdfDoc.autoTable({
          head: [columns.map((col) => col.name)],
          body: rows,
          startY: 30, 
        });
      
        pdfDoc.save(`${tableName}_table.pdf`);
      };
  return (
    <div>
      <FaFilePdf
        size={20}  style={{ color: "white" }}
        onClick={() => generatePDF(columns, data, tableName)}
      /> 
    </div>
  );
}

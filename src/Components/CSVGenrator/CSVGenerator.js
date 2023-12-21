import React from 'react';

const CSVGenerator = ({ columns, data }) => {
  const downloadCSV = () => {
    // Convert data to CSV format
    const csvContent = [
        columns.map(column => column.name).join(','),
        ...data.map(row =>
          columns.map(column => `"${row[column.selector]}"`).join(',')
        ),
      ].join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
    <div>
      <button  style={{ color: "red" }} onClick={downloadCSV}>CSV</button>
    </div>
  );
};

export default CSVGenerator;

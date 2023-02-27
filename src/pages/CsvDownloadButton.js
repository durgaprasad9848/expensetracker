import React from 'react';
import { CSVLink } from 'react-csv';
import { useSelector } from 'react-redux';

 

const CsvDownloadButton = () => {
  const data = useSelector((state) => state.expenses.data);
  const headers = [
    { label: "Category", key: "category" },
    { label: "Description", key: "description" },
    { label: "Money", key: "money" }
  ];
  
  const csvData = Object.values(data).map(item => ({
    category: item.category,
    description: item.description,
    money: item.money
  }));
  
  return (
    <CSVLink data={csvData} headers={headers} filename={"data.csv"}>
  
      <button>Download CSV</button>
    </CSVLink>
  );
};

export default CsvDownloadButton;

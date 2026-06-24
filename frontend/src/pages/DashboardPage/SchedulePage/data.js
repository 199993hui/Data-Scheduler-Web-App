import { useEffect, useState } from "react";

function Data({ get_Data }) {
  const [tableData, setTableData] = useState([]);

  const getData = async () => {
    try {
      const table = { table: "output_loading plan" };
      await fetch("http://127.0.0.1:5000/table_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(table),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const table = JSON.parse(data);
          get_Data(table);
          setTableData(table);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return <></>;
}

export default Data;

import { useEffect, useState } from "react";

function Data({ get_Data, setIsLoading }) {
  const [tableData, setTableData] = useState([]);

  const getData = async () => {
    setIsLoading();
    try {
      await fetch("http://127.0.0.1:5000/clustering", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const table = data;
          get_Data(table);
          setTableData(table);
          setIsLoading();

          localStorage.setItem("clusteringPageData", JSON.stringify(data));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedTableData = localStorage.getItem("clusteringPageData");
    if (storedTableData) {
      const parsedTableData = JSON.parse(storedTableData);
      setTableData(parsedTableData);
      get_Data(parsedTableData);
    } else {
      getData();
    }
  }, []);

  return <></>;
}

export default Data;

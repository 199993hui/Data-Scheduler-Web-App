import React, { useState, useEffect } from "react";
import Data from "./data";
import SideBar from "./components/SideBar";

function ClusteringPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const setIsLoading = () => {
    setLoading((loading) => {
      return !loading;
    });
  };

  const get_Data = (data) => {
    setData(data);
    console.log(data);
  };
  return (
    <>
      <Data get_Data={get_Data} setIsLoading={setIsLoading} />

      {data.length !== 0 ? <SideBar data={data} loading={loading} /> : <></>}
    </>
  );
}

export default ClusteringPage;

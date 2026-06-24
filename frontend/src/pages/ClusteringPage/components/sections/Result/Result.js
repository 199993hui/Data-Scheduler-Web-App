import { Grid, Container, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

import ScatterPlot from "./Chart/ScatterPlot";
import BarChart from "./Chart/BarChart";
import SelectCategorical from "./Chart/SelectCategorical";
import SelectNumerical from "./Chart/SelectNumerical";

function Result({ data, scaledFeature }) {
  const [selectedData, setSelectedData] = useState([]);
  const [selectedCluster, setSelectedCluster] = useState("5");
  const [selectedNumerical_1, setSelectedNumerical_1] = useState("");
  const [selectedNumerical_2, setSelectedNumerical_2] = useState("");
  const [selectedCategorical, setSelectedCategorical] = useState("");
  const [selectedProcessedCluster, setSelectedProcessedCluster] = useState({});
  

  const select_numerical_1 = (data) => {
    setSelectedNumerical_1(data);
  };
  const select_numerical_2 = (data) => {
    setSelectedNumerical_2(data);
  };

  const select_categorical = (data) => {
    setSelectedCategorical(data);
  };

  const handleChange = (event) => {
    setSelectedCluster(event.target.value);
  };

  let length = scaledFeature[0] ? Object.keys(scaledFeature[0]).length : 0;

  useEffect(() => {
    const storedCluster = localStorage.getItem("selectedCluster");
    const storedNumerical_1 = localStorage.getItem("selectedNumerical_1");
    const storedNumerical_2 = localStorage.getItem("selectedNumerical_2");
    const storedCategorical = localStorage.getItem("selectedCategorical");

    if (storedCluster) {
      setSelectedCluster(storedCluster);
    }
    if (storedNumerical_1) {
      setSelectedNumerical_1(storedNumerical_1);
    }
    if (storedNumerical_2) {
      setSelectedNumerical_2(storedNumerical_2);
    }
    if (storedCategorical) {
      setSelectedCategorical(storedCategorical);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCluster", selectedCluster);
    localStorage.setItem("selectedNumerical_1", selectedNumerical_1);
    localStorage.setItem("selectedNumerical_2", selectedNumerical_2);
    localStorage.setItem("selectedCategorical", selectedCategorical);
  }, [selectedCluster, selectedNumerical_1, selectedNumerical_2, selectedCategorical]);

  
  useEffect(() => {
    fetchData();
  }, [
    selectedCluster,
    length,
  ]);


  const fetchData = async () => {
    await fetch("http://localhost:5000/clustering_result", {
      method: "POST",
      body: JSON.stringify({
        df_cleaned: data[3],
        scaled_df: data[4],
        scaled_feature: scaledFeature,
        k: selectedCluster,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let [clusters] = data;
        if (clusters !== undefined){
        let processed_cluster = clusters.reduce((current, next) => {
          if (!current[next.cluster]) {
            current[next.cluster] = [];
            current[next.cluster].push(next);
          } else {
            current[next.cluster].push(next);
          }
          return current;
        }, {});
        setSelectedProcessedCluster(processed_cluster);
        setSelectedData(data);}
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

 
  return (
    <>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          sx={{
            mb: 5,
            fontFamily: '"Segoe UI"',
            fontDisplay: "swap",
            fontWeight: 550,
            textAlign: "left",
          }}
        >
          Result
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Slider
              aria-label="Number of Clusters"
              defaultValue={selectedCluster}
              onChange={handleChange}
              valueLabelDisplay="auto"
              step={1}
              marks={["2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              min={2}
              max={10}
            />
          </Grid>
          <Grid item xs={10} style={{ width: "50px" }}></Grid>
          <Grid item xs={3}>
            <SelectNumerical
              data={data[0]}
              select_numerical={select_numerical_1}
              selectedNumerical={selectedNumerical_1}
            />
          </Grid>
          <Grid item xs={3}>
            <SelectNumerical
              data={data[0]}
              select_numerical={select_numerical_2}
              selectedNumerical={selectedNumerical_2}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectCategorical
              data={data[1]}
              select_categorical={select_categorical}
              selectedCategorical={selectedCategorical}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={6} md={6} style={{ textAlign: "left" }}>
            <ScatterPlot
              data={selectedProcessedCluster}
              selectedNumerical_1={selectedNumerical_1}
              selectedNumerical_2={selectedNumerical_2}
            />
          </Grid>

          <Grid item xs={10} md={2} lg={6} style={{ textAlign: "left" }}>
            <BarChart
              categoricalData={selectedData}
              selectedCategorical={selectedCategorical}
              number_of_cluster={selectedCluster}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Result;

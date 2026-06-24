import { useState, useEffect } from "react";
import { Grid, Container, Typography} from "@mui/material";

import SwitchLabel from "./DataFrame/DataFrame";
import LineChart from "./LineChart/LineChart";
import Checkboxes from "./LineChart/Checkbox";

function Cluster({ data, select_Scaled_Feature }) {
  const [selectedFeature, setSelectedFeature] = useState({});

  const select_feature = (data) => {
    setSelectedFeature(data);
    
  };
  const select_ScaledFeature = (data)=>{
    select_Scaled_Feature(data);
    
    localStorage.setItem("clusterResult", JSON.stringify(data));
  };
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("clusterResult"));
    if (storedData) {
      select_Scaled_Feature(storedData);
    }
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ marginTop: "100px" }}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                mb: 1,
                fontFamily: '"Segoe UI"',
                fontDisplay: "swap",
                fontWeight: 550,
                textAlign: "left",
              }}
            >
              Clustering Model
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"Segoe UI"',
                fontDisplay: "swap",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              Feature Selection
            </Typography>
            <SwitchLabel data={data} />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{
                mb: -3,
                fontFamily: '"Segoe UI"',
                fontDisplay: "swap",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              Elbow Method / Silhouette Score
            </Typography>
          </Grid>

          <Grid item xs={12} md={9}>
            <LineChart
              data={data[4]}
              selectedFeature={selectedFeature}
              select_ScaledFeature={select_ScaledFeature}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Checkboxes data={data[2]} select_feature={select_feature} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Cluster;

import { Grid, Container, Typography } from "@mui/material";
import { useState } from "react";

import SwitchLabel from "./DataFrame/DataFrame";
import SelectHistogram from "./Histogram/SelectHistogram";
import SelectBar from "./BarChart/SelectBar";

import Histogram_Chart from "./Histogram/Histogram";
import BarChart from "./BarChart/BarChart";


function Feature({ data }) {
  const [selectedHist, setSelectedHist] = useState("");
  const [selectedBar, setSelectedBar] = useState("");

  const select_hist = (data) => {
    setSelectedHist(data);
  };
  const select_bar = (data) => {
    setSelectedBar(data);
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
        Features
      </Typography>

      <SwitchLabel data={data} />

      <Typography
        variant="h6"
        sx={{
          mb: 5,
          fontFamily: '"Segoe UI"',
          fontDisplay: "swap",
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        Features Distribution
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={4} sm={4}>
              <SelectHistogram data={data[0]} select_hist={select_hist} />
            </Grid>
            <Grid item xs={8} sm={8}>
              <Histogram_Chart data={data[3]} selectedHist={selectedHist} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ height: "60px" }} />{" "}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={4} sm={4}>
              <SelectBar data={data[1]} select_bar={select_bar} />
            </Grid>
            <Grid item xs={8} sm={8}>
              <BarChart data={data[3]} selectedBar={selectedBar} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </>
);

}

export default Feature;

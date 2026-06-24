import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Schart = ({ scatterData }) => {
  return (
    <Paper sx={{ width: "75%", overflow: "hidden", margin: "50px auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Frequency vs Double-Sided
      </Typography>
      <ScatterChart
        width={500}
        height={300}
        style={{ margin: "12px auto" }}
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid />
        <XAxis
          label={{
            value: "Double-Sided",
            offset: 0,
            position: "insideBottom",
          }}
          dataKey="name"
          type="category"
          allowDuplicatedCategory={false}
          name="Double Sided"
        />
        <YAxis
          label={{
            value: "Frequency",
            angle: -90,
            offset: 0,
            position: "insideLeft",
          }}
          dataKey="UPH"
          name="UPH"
          type="number"
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={scatterData} fill="#3e8894" />
      </ScatterChart>
    </Paper>
  );
};

export default Schart;

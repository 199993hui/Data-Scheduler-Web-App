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

const SChart = ({ scatterData }) => {
  const sortedData = scatterData.sort((a, b) => {
    return a["Total Order Quantity"] - b["Total Order Quantity"];
  });

  return (
    <Paper sx={{ width: "75%", overflow: "hidden", margin: "50px auto" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Relationship between Total Quantity of Order and the Number of Order
      </Typography>
      <ResponsiveContainer width="80%" height={350}>
        <ScatterChart
          width={700}
          height={500}
          style={{ margin: "12px auto" }}
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: 10,
          }}
        >
          <CartesianGrid />
          <XAxis
            dataKey="Total Order Quantity"
            type="category"
            allowDuplicatedCategory={false}
            name="Total Quantity of a Product"
            label={{
              value: "Total Order Quantity",
              offset: -10,
              position: "insideBottom",
            }}
          />
          <YAxis
            label={{
              value: "Number of Order",
              angle: -90,
              offset: 20,
              position: "insideLeft",
            }}
            dataKey="No. of Order"
            name="No. of Order of a Product"
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={sortedData} fill="#287b88" />
        </ScatterChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default SChart;

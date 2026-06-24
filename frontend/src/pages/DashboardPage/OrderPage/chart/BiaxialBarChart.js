import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function BBchart({ bbarData }) {
  return (
    <Paper
      sx={{
        width: "75%",
        overflow: "hidden",
        margin: "50px auto",
        padding: "30px",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Total Order Quantity & Number of Order of Products
      </Typography>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          width={500}
          height={450}
          data={bbarData}
          style={{ margin: "12px auto" }}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 8 }}
            label={{
              value: "Products",
              offset: -40,
              position: "insideBottom",
            }}
          />
          <YAxis
            label={{
              value: "Total Order Quantity",
              angle: -90,
              offset: -10,
              position: "insideLeft",
            }}
            yAxisId="left"
            orientation="left"
            stroke="#287b88"
          />
          <YAxis
            label={{
              value: "Number of Order",
              angle: 90,
              position: "insideRight",
            }}
            yAxisId="right"
            orientation="right"
            stroke="#a1e6f1"
          />
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "12px" }}
          />
          <Bar yAxisId="left" dataKey="Total Order Quantity" fill="#287b88" />
          <Bar yAxisId="right" dataKey="No. of Order" fill="#a1e6f1" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

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

const Bchart_1 = ({ barData }) => {
  return (
    <Paper
      sx={{
        width: "75%",
        overflow: "hidden",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        UPH vs Products
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={900}
          height={400}
          style={{ margin: "12px auto" }}
          data={barData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 50,
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
              offset: -50,
              position: "insideBottom",
            }}
          />
          <YAxis
            label={{
              value: "UPH",
              angle: -90,
              offset: 0,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: "12px" }}
          />
          <Bar dataKey="UPH" fill="#287b88" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Bchart_1;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Bchart_2 = ({ barData_2}) => {
  return (
   
      <BarChart
        width={600}
        height={500}
        style={{ margin: "12px auto" }}
        data={barData_2}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          interval={0}
          tick={{ fontSize: 8 }}
        />
        <YAxis />
        <Tooltip />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ paddingLeft: "12px" }}
        />
        <Bar dataKey="No. of Order" fill="#a1e6f1" />
      </BarChart>

  );
};

export default Bchart_2;

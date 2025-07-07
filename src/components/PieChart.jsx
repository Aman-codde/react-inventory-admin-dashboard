import React from "react";
import {
  PieChart as ReactPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
//import products from "../data/products_data";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#00E396",
  "#775DD0",
];
const PieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ReactPieChart>
        <Pie
          data={products}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="stock"
          nameKey={name}
          label
        >
          {products.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]}></Cell>
          ))}
        </Pie>
        <Legend></Legend>
        <Tooltip></Tooltip>
      </ReactPieChart>
    </ResponsiveContainer>
  );
};
export default PieChart;

import React from "react";
import {
  LineChart as ReactLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useProducts from "../hooks/useProducts";

const LineChart = () => {
  const { products } = useProducts();

  return (
    <ResponsiveContainer width="100%" height={360}>
      <ReactLineChart data={products}>
        <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
      <Line type="monotone" dataKey="stock" stroke="#82ca9d" />
    </ReactLineChart>
  </ResponsiveContainer>
);
}
export default LineChart;

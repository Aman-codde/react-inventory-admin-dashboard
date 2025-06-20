import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import products from "../data/products_data";

const LOW_STOCK_THRESHOLD = 2000;
const ChartView = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={products}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="price" fill="#1e293b" />
      <Bar dataKey="stock">
        {products.map((entry, index) => (
          <Cell
            key={`cell-stock-${index}`}
            fill={entry.stock < LOW_STOCK_THRESHOLD ? "red" : "green"}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
export default ChartView;

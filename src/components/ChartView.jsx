import React, { useState } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import common from '../styles/common.module.css';

function ChartView() {
  const [chart, setChart] = useState("bar");

  return (
    <div>
      <h1 className={common.heading}>Charts of Data</h1>
      <div className={common.buttonContainer}>
        <button onClick={() => setChart("bar")}>Bar Chart</button>
        <button onClick={() => setChart("line")}>Line Chart</button>
        <button onClick={() => setChart("pie")}>Pie Chart</button>
      </div>

      <div>
        {chart === "bar" && <BarChart />}
        {chart === "line" && <LineChart />}
        {chart === "pie" && <PieChart />}
      </div>
    </div>
  );
}

export default ChartView;

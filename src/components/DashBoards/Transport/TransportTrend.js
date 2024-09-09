import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TransportTrend = ({ totalBusesData, electricBusesData }) => {
  const [chartData, setChartData] = useState({
    BaseChart: [],
  });

  useEffect(() => {
    // Map data to include only year in the label
    const totalBusesDataPoints = totalBusesData.map(({ year, count }) => ({
      label: year.toString(),
      x: new Date(year, 0), // Set the month and day to zero to represent only the year
      y: parseFloat(count),
    }));

    const electricBusesDataPoints = electricBusesData.map(
      ({ year, count }) => ({
        label: year.toString(),
        x: new Date(year, 0),
        y: parseFloat(count),
      })
    );

    const newChartData = {
      BaseChart: [
        {
          name: "Total Buses",
          type: "splineArea",
          showInLegend: true,
          dataPoints: totalBusesDataPoints,
          color: "#FFA38F",
          markerSize: 5,
        },
        {
          name: "Electric Buses",
          type: "line",
          showInLegend: true,
          dataPoints: electricBusesDataPoints,
          color: "#2A9D8F",
          markerSize: 5,
        },
      ],
    };

    setChartData(newChartData);
  }, [totalBusesData, electricBusesData]);

  const baseChartOptions = {
    animationEnabled: true,
    theme: "light2",
    height: 300,
    title: {
      text: "Buses Trend Over the Past Decade",
      fontSize: 15,
      fontFamily: "DM Sans",
      fontWeight: "800",
    },
    axisX: {
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      valueFormatString: "YYYY", // Show only year
    },
    axisY: {
      gridThickness: 0,
      includeZero: false,
      labelFontColor: "#717171",
      lineColor: "#a2a2a2",
      tickColor: "#a2a2a2",
      lineThickness: 1,
      title: "Number of Buses",
    },
    data: chartData["BaseChart"] || [],
    toolTip: {
      shared: true, // Allows shared tooltip for comparing data points
      content: "{name}: {y} buses",
    },
  };

  return (
    <div className="transport-trend-chart">
      <CanvasJSChart
        options={baseChartOptions}
        containerProps={{ width: "100%", height: "300px" }}
      />
    </div>
  );
};

export default TransportTrend;

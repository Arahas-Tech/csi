import React from "react";
import TransportTrend from "./TransportTrend";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { BarChart, DonutChart } from "../../GraphVisuals";
import StackedBarChart from "./StackedBarChart";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import CustomTooltip from "./CustomTooltip";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = ({ title, labels, series, height, width }) => {
  const colors = ["#00A269", "#B8B8B8", "#A9F3E0", "grey"];
  
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 12,
      fontFamily: "DM Sans",
      fontWeight: "800",
    },
    height,
    width,
    data: [
      {
        type: "doughnut",
        startAngle: 20,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: false,
        color: colors,
        indexLabel: "{label} - #percent%",
        indexLabelFontSize: 8,
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colors[index % colors.length],
        })),
      },
    ],
    legend: {
      fontSize: 10,
      horizontalAlign: "center",
      verticalAlign: "bottom",
    },
  };

  return <CanvasJSChart options={options} />;
};

const BusDashboard = () => {
  const totalBusesData = [
    { year: 2014, count: 1500 },
    { year: 2015, count: 1550 },
    { year: 2016, count: 1400 },
    { year: 2017, count: 1650 },
    { year: 2018, count: 1800 },
    { year: 2019, count: 1750 },
    { year: 2020, count: 1800 },
    { year: 2021, count: 1050 },
    { year: 2022, count: 1900 },
    { year: 2023, count: 1950 },
  ];

  const electricBusesData = [
    { year: 2014, count: 100 },
    { year: 2015, count: 130 },
    { year: 2016, count: 140 },
    { year: 2017, count: 160 },
    { year: 2018, count: 100 },
    { year: 2019, count: 200 },
    { year: 2020, count: 220 },
    { year: 2021, count: 220 },
    { year: 2022, count: 160 },
    { year: 2023, count: 280 },
  ];
  const deathData = [
    { year: "2014", deaths: 1200 },
    { year: "2015", deaths: 1100 },
    { year: "2016", deaths: 1500 },
    { year: "2017", deaths: 1400 },
    { year: "2018", deaths: 1300 },
    { year: "2019", deaths: 1600 },
    { year: "2020", deaths: 1700 },
    { year: "2021", deaths: 1800 },
    { year: "2022", deaths: 1900 },
    { year: "2023", deaths: 2000 },
  ];
  const labels = ["Male", "Female", "Other"];
  const series = [60, 35, 5];
  const years = deathData.map((item) => item.year);
  const deaths = deathData.map((item) => item.deaths);
  const busLabels = ["Diesel", "Electric", "Hybrid"];
  const busSeries = [126, 82, 95];


  const passengerLabels = ["Cash", "Contactless"];
  const passengerSeries = [74657, 98340];

  const commonCardProps = {
    className: "p-shadow-4",
    style: { width: "200px", height: "100px", backgroundColor: "#f2f2f2" },
  };

  return (
    <div className="flex gap-1 flex-column">
      <div className="flex flex-row justify-content-center flex gap-3">
        {/* First Card with Custom Tooltip */}
        <CustomTooltip
          content={
            <div className="flex justify-content-center align-items-center h-full w-full">
              <DonutChart
                title="Total Running buses"
                labels={busLabels}
                series={busSeries}
                height={150}
                width={220}
              />
            </div>
          }
        >
          <Card
            {...commonCardProps}
            className="flex flex-column align-items-center justify-content-center"
          >
            <p className="m-0 text-xs text-900 font-bold">
              Total Running buses
            </p>
            <p className="m-0 text-xs text-900">303</p>
          </Card>
        </CustomTooltip>
    <div className="flex flex-row justify-content-center flex gap-3">
      {/* First Card with Custom Tooltip */}
      <CustomTooltip
        content={
          <div className="flex justify-content-center align-items-center">
            <DonutChart
              title="Total Running buses"
              labels={busLabels}
              series={busSeries}
              height={150}
              width={200}
            />
          </div>
        }
      >
        <Card {...commonCardProps} className="flex flex-column align-items-center justify-content-center">
          <p className="m-0 text-xs text-900 font-bold">Total Running buses</p>
          <p className="m-0 text-xs text-900">303</p>
        </Card>
      </CustomTooltip>

        {/* Second Card with Custom Tooltip */}
        <CustomTooltip
          content={
            <Card className="flex h-full w-full">
              <p className="m-0 text-xs">Total buses on any day</p>
              <p className="m-0 text-xs">Average capacity of a bus</p>
              <p className="m-0 text-xs">Total population</p>
            </Card>
          }
        >
          <Card
            {...commonCardProps}
            className="flex flex-column align-items-center justify-content-center"
          >
            <p className="m-0 text-xs text-900 font-bold">
              Average availability on a day
            </p>
            <p className="m-0 text-xs text-900">
              = Total buses on any day / Total population
            </p>
          </Card>
        </CustomTooltip>
      {/* Second Card with Custom Tooltip */}
      <CustomTooltip
        content={
          <Card className="flex">
            <p className="m-0 text-xs">Total buses on any day</p>
            <p className="m-0 text-xs">Average capacity of a bus</p>
            <p className="m-0 text-xs">Total population</p>
          </Card>
        }
      >
        <Card {...commonCardProps} className="flex flex-column align-items-center justify-content-center">
          <p className="m-0 text-xs text-900 font-bold">Average availability on a day</p>
          <p className="m-0 text-xs text-900">= Total buses on any day / Total population</p>
        </Card>
      </CustomTooltip>

        {/* Third Card with Custom Tooltip */}
        <CustomTooltip
          content={
            <Card className="flex h-full w-full">
              <p className="m-0 text-xs">Maintained buses</p>
              <p className="m-0 text-xs">Total buses</p>
            </Card>
          }
        >
          <Card
            {...commonCardProps}
            className="flex flex-column align-items-center justify-content-center"
          >
            <p className="m-0 text-xs text-900 font-bold">
              Percentage that goes under maintenance checks
            </p>
            <p className="m-0 text-xs text-900">
              = Maintained buses / Total buses
            </p>
          </Card>
        </CustomTooltip>
      {/* Third Card with Custom Tooltip */}
      <CustomTooltip
        content={
          <Card className="flex">
            <p className="m-0 text-xs">Maintained buses</p>
            <p className="m-0 text-xs">Total buses</p>
          </Card>
        }
      >
        <Card {...commonCardProps} className="flex flex-column align-items-center justify-content-center">
          <p className="m-0 text-xs text-900 font-bold">
            Percentage that goes under maintenance checks
          </p>
          <p className="m-0 text-xs text-900">= Maintained buses / Total buses</p>
        </Card>
      </CustomTooltip>

        {/* Fourth Card with Custom Tooltip */}
        <CustomTooltip
          content={
            <div className="flex justify-content-center align-items-center h-full w-full">
              <DonutChart
                title="Total passenger count"
                labels={passengerLabels}
                series={passengerSeries}
                height={150}
                width={200}
              />
            </div>
          }
        >
          <Card
            {...commonCardProps}
            className="flex flex-column align-items-center justify-content-center"
          >
            <p className="m-0 text-xs text-900 font-bold">
              Total passenger count
            </p>
            <p className="m-0 text-xs text-900">= Cash + Contactless</p>
          </Card>
        </CustomTooltip>
      {/* Fourth Card with Custom Tooltip */}
      <CustomTooltip
        content={
          <div className="flex justify-content-center align-items-center">
            <DonutChart
              title="Total passenger count"
              labels={passengerLabels}
              series={passengerSeries}
              height={150}
              width={200}
            />
          </div>
        }
      >
        <Card {...commonCardProps} className="flex flex-column align-items-center justify-content-center">
          <p className="m-0 text-xs text-900 font-bold">Total passenger count</p>
          <p className="m-0 text-xs text-900">= Cash + Contactless</p>
        </Card>
      </CustomTooltip>

        {/* Fifth Card with Custom Tooltip */}
        <CustomTooltip
          content={
            <Card className="flex h-full w-full">
              <p className="m-0 text-xs">Total signals with CCTVs</p>
              <p className="m-0 text-xs">Total signals</p>
            </Card>
          }
        >
          <Card
            {...commonCardProps}
            className="flex flex-column align-items-center justify-content-center"
          >
            <p className="m-0 text-xs text-900 font-bold">
              Percentage availability of Traffic surveillance
            </p>
            <p className="m-0 text-xs text-900">
              = Total signals with CCTVs / Total signals
            </p>
          </Card>
        </CustomTooltip>
      </div>
      <Panel>
        <TransportTrend
          totalBusesData={totalBusesData}
          electricBusesData={electricBusesData}
        />
      </Panel>
      <Panel>
        <div className="flex fle-row gap-1 ">
          <Card className="w-full h-17rem">
            <BarChart
              title="Number of Deaths Over the Past Decade"
              categories={years}
              series={[deaths]}
              height={200}
              xtitle=""
              ytitle=""
              labelFontSize={10}
            />
          </Card>
          <Card className="w-full h-17rem">
            <StackedBarChart />
          </Card>
          <Card className="w-full h-17rem">
            <DonutChart
              title={"Revenue Generated Gender-wise"}
              labels={labels}
              series={series}
              height={200}
            />
          </Card>
        </div>
      </Panel>
      {/* Fifth Card with Custom Tooltip */}
      <CustomTooltip
        content={
          <Card className="flex">
            <p className="m-0 text-xs">Total signals with CCTVs</p>
            <p className="m-0 text-xs">Total signals</p>
          </Card>
        }
      >
        <Card {...commonCardProps} className="flex flex-column align-items-center justify-content-center">
          <p className="m-0 text-xs text-900 font-bold">
            Percentage availability of Traffic surveillance
          </p>
          <p className="m-0 text-xs text-900">= Total signals with CCTVs / Total signals</p>
        </Card>
      </CustomTooltip>
    </div>
  );
};
export default BusDashboard;

import React from "react";
import TransportTrend from "./TransportTrend";
import { Panel } from "primereact/panel";
import { Card } from "primereact/card";
import { BarChart, DonutChart } from "../../GraphVisuals";
import StackedBarChart from "./StackedBarChart";
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
  return (
    <div className="flex gap-1 flex-column">
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
    </div>
  );
};

export default BusDashboard;

import React from "react";
import { Card } from "primereact/card";
import { DonutChart } from "../../GraphVisuals"; // Assuming you already have DonutChart
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // Core PrimeReact styles
import "primeflex/primeflex.css"; // PrimeFlex CSS
import CustomTooltip from "./CustomTooltip";

const BusDashboard = () => {
  // Dummy data for donut charts
  const busLabels = ["Diesel", "Electric", "Hybrid"];
  const busSeries = [126, 82, 95];

  const passengerLabels = ["Cash", "Contactless"];
  const passengerSeries = [74657, 98340];

  return (
    <div className="flex flex-row justify-content-center gap-3">
      {/* First Card with Custom Tooltip */}
      <div className="flex">
        <CustomTooltip
          content={
            <Card className="flex align-items-center">
              <DonutChart
                title="Total Running buses"
                labels={busLabels}
                series={busSeries}
                height={200}
                width={200}
              />
            </Card>
          }
        >
          <Card className="p-shadow-4 align-items-center justify-content-center">
            <p className="m-0 text-sm font-bold">Total Running buses</p>
            <p className="text-xs">303</p>
          </Card>
        </CustomTooltip>
      </div>

      {/* Second Card with Custom Tooltip */}
      <div className="flex">
        <CustomTooltip
          content={
            <Card className="flex align-items-center">
              <p className="m-0 text-xs">Total buses on any day</p>
              <p className="m-0 text-xs">Average capacity of a bus</p>
              <p className="m-0 text-xs">Total population</p>
            </Card>
          }
        >
          <Card className="p-shadow-4 align-items-center">
            <p className="m-0 text-sm font-bold">
              Average availability on a day
            </p>
            <p className="text-xs">Status: Under Maintenance</p>
          </Card>
        </CustomTooltip>
      </div>

      {/* Third Card with Custom Tooltip */}
      <div className="flex">
        <CustomTooltip
          content={
            <Card className="flex align-items-center">
              <p className="m-0 text-xs">Total buses on any day</p>
              <p className="m-0 text-xs">Average capacity of a bus</p>
              <p className="m-0 text-xs">Total population</p>
            </Card>
          }
        >
          <Card className="p-shadow-4">
            <p className="m-0 text-sm font-bold">
              Percentage that goes under maintenance checks
            </p>
            <p className="text-xs">Status: Delayed</p>
          </Card>
        </CustomTooltip>
      </div>

      {/* Fourth Card with Custom Tooltip */}
      <div className="flex">
        <CustomTooltip
          content={
            <Card className="flex ">
              <DonutChart
                title="Total passenger count"
                labels={passengerLabels}
                series={passengerSeries}
                height={200}
                width={200}
              />
            </Card>
          }
        >
          <Card className="p-shadow-4">
            <p className="m-0 text-sm font-bold">Total passenger count</p>
            <p className="text-xs">Status: Data in chart</p>
          </Card>
        </CustomTooltip>
      </div>

      {/* Fifth Card with Custom Tooltip */}
      <div className="flex">
        <CustomTooltip
          content={
            <Card className="flex">
              <p className="m-0 text-xs">Total buses on any day</p>
              <p className="m-0 text-xs">Average capacity of a bus</p>
              <p className="m-0 text-xs">Total population</p>
            </Card>
          }
        >
          <Card className="p-shadow-4">
            <p className="m-0 text-sm font-bold">
              Percentage availability of Traffic surveillance
            </p>
            <p className="text-xs">Status: Data in chart</p>
          </Card>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default BusDashboard;

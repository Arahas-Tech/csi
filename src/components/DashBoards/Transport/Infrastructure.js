import { Card } from "primereact/card";
import React from "react";
import { Doughnut, GroupedBarChart } from "../../GraphVisuals";

const Infrastructure = () => {
  const maintaincategories = ["Road", "Rail", "Airways", "Waterways"];
  const maintainseries = [
    [70, 80, 60, 50], // This represents the percentage of well-maintained infrastructures
  ];
  return (
    <>
      <div className="flex align-items-center justify-content-between flex-row gap-1">
        <Card>
          <div className="flex align-items-center justify-content-between flex-column gap-3 text-center">
            <h1
              className=" m-0 pl-2 pr-2  text-3xl text-green-500 border-circle"
              style={{ backgroundColor: "#ECFFE6" }}
            >
              8
            </h1>
            <h1 className=" m-0 p-1 text-xs">
              Road Condition Rating <br />
              (0-10)
            </h1>
          </div>
          {/* <Doughnut
            title="% of Well Maintained Roads"
            labels={["Maintatined", "Total"]}
            categories={[70, 100]}
            height={100}
          /> */}
        </Card>
        <Card>
          <div className="flex align-items-center justify-content-between flex-column gap-3 text-center">
            <h1
              className=" m-0 pl-2 pr-2  text-3xl text-green-500 border-circle"
              style={{ backgroundColor: "#ECFFE6" }}
            >
              7
            </h1>
            <h1 className=" m-0 p-1 text-xs">
              Rail Condition Rating <br />
              (0-10)
            </h1>
          </div>
        </Card>
        <Card>
          <div className="flex align-items-center justify-content-between flex-column gap-3 text-center">
            <h1
              className=" m-0 pl-2 pr-2  text-3xl text-green-500 border-circle"
              style={{ backgroundColor: "#ECFFE6" }}
            >
              9
            </h1>
            <h1 className=" m-0 p-1 text-xs">
              Airways Condition Rating <br />
              (0-10)
            </h1>
          </div>
        </Card>
        <Card>
          <div className="flex align-items-center justify-content-between flex-column gap-3 text-center">
            <h1
              className=" m-0 pl-2 pr-2 text-3xl text-green-500  border-circle"
              style={{ backgroundColor: "#ECFFE6" }}
            >
              6
            </h1>
            <h1 className=" m-0 p-1 text-xs">
              Waterways Condition Rating <br />
              (0-10)
            </h1>
          </div>
        </Card>
        <Card className="w-full">
          <GroupedBarChart
            title="Percentage of Well-Maintained Infrastructure"
            categories={maintaincategories}
            series={maintainseries}
            height={125}
          />
        </Card>
      </div>
    </>
  );
};

export default Infrastructure;

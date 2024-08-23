import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProgressSpinner } from "primereact/progressspinner";
import "./Dash.css";
import good from "./DashImages/good.png";
import moderate from "./DashImages/moderate.png";
import poor from "./DashImages/poor.png";
import very_poor from "./DashImages/very_poor.png";
import severe from "./DashImages/severe.png";
import AqiReport from "../Environment/AqiReport";
import AQIChart from "../Environment/AQIChart";
import PollutantChart from "./PollutantChart";
import { CustomBarChart, DonutChart } from "../GraphVisuals";
import FileUploadPopup from "../upload-popup/FileUploadPopup";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import TableSkeleton from "../ui/skeletons/TableSkeleton";
import AqiMap from "../Environment/Maps/AqiMap";
import TempMap from "../Environment/Maps/TempMap";

// Define the helper functions here
const formatDate = (date) => date.toISOString().split("T")[0]; // Format date to 'YYYY-MM-DD'
const formatTimeToHHMMSS = (time) =>
  time.toISOString().split("T")[1].split(".")[0]; // Format time to 'HH:MM:SS'

const TempDashboard = ({
  onDataChange,
  show,
  pSelectedLocation,
  pSelectedStartDate,
  pSelectedEndDate,
}) => {
  const [startDate, setStartDate] = useState(
    pSelectedStartDate ?? new Date("2024-01-01")
  );
  const [endDate, setEndDate] = useState(
    pSelectedEndDate ?? new Date("2024-08-13")
  );
  const [aqiData, setAqiData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    pSelectedLocation ?? "Ayodhya - Civil line,Tiny tots"
  );
  const [tempValue, setTempValue] = useState(null);
  const [humidityValue, setHumidityvalue] = useState(null);
  const [tempStatus, setTempStatus] = useState({
    status: "",
    color: "",
    textColor: "",
    image: null,
  });
  const [dataTableData, setDataTableData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [envirotime, setEnviroTime] = useState([]);
  const [envirodate, setEnviroDate] = useState([]);
  const [enviroco2, setEnviroco2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [temperature, setTemp] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const handleLocationChange = (e) => {
    if (show) {
      setSelectedLocation(e.value.code);
      setLoading(true); // Start loading when location changes
    }
  };
  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        "https://api-csi.arahas.com/upload/environment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locationsResponse = await axios.get(
          `https://api-csi.arahas.com/data/locations`
        );
        if (locationsResponse.data) {
          const locationOptions = locationsResponse.data.data.map((data) => ({
            label: data,
            value: data,
          }));
          setLocations(locationOptions);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    if (selectedLocation) {
      handleSearch();
    }
  }, []);

  useEffect(() => {
    handleSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pSelectedLocation, pSelectedEndDate, pSelectedStartDate]);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const start = new Date(startDate).toDateString("en-CA");
      const end = new Date(endDate).toDateString("en-CA");

      const response = await axios.get(
        `https://api-csi.arahas.com/data/environment?location=${selectedLocation}&startDate=${start}&endDate=${end}`
      );
      const filteredData = response.data.data;
      console.log(filteredData);

      const formattedDate = [];
      const formattedTime = [];
      const co2 = [];
      const temperature = [];
      const humidity = [];

      filteredData.forEach((item) => {
        const dateObj = new Date(item.time).toLocaleDateString("en-CA");

        formattedDate.push(dateObj);

        const timeObj = new Date(item.time).toLocaleTimeString(
          {},
          { hourCycle: "h24" }
        );
        formattedTime.push(timeObj);
        co2.push(item.co2);
        temperature.push(item.temp);
        humidity.push(item.humidity);
      });

      setEnviroTime(formattedTime);
      setEnviroDate(formattedDate);
      setEnviroco2(co2);
      setTemp(temperature);
      setHumidity(humidity);

      if (filteredData.length > 0) {
        const averageTemp = (
          filteredData.reduce((sum, item) => sum + item.temp, 0) /
          filteredData.length
        ).toFixed(2);
        const averageHumidity = (
          filteredData.reduce((sum, item) => sum + item.humidity, 0) /
          filteredData.length
        ).toFixed(2);

        setTempValue(averageTemp);
        setHumidityvalue(averageHumidity);

        if (onDataChange) {
          onDataChange({
            tempValue: averageTemp,
            humidityValue: averageHumidity,
          });
        }
        setTempStatus(getTempStatus(averageTemp));
      } else {
        setTempValue(null);
        setTempStatus({ status: "", color: "", textColor: "", image: null });
      }

      const filteredDataWithDeviation = filteredData
        .filter((item) => item.temp > 40)
        .map((item) => ({
          date: formatDate(new Date(item.time)),
          time: formatTimeToHHMMSS(new Date(item.time)),
          temp: item.temp,
          deviationPercentage: (((item.temp - 40) / 40) * 100).toFixed(2) + "%",
        }));

      const uniqueDataTableData = Array.from(
        new Set(filteredDataWithDeviation.map(JSON.stringify))
      ).map(JSON.parse);

      setDataTableData(uniqueDataTableData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!show && pSelectedLocation) {
      setSelectedLocation(pSelectedLocation);
    }
  }, [show, pSelectedLocation]);
  // {showPopup && (
  //   <FileUploadPopup
  //     onClose={() => setShowPopup(false)}
  //     onUpload={handleUpload}
  //     department={"environment"}
  //     action={selectedAction}
  //     subCategory={"Aqi"}
  //   />
  // )}

  useEffect(() => {
    if (!show && pSelectedStartDate) {
      setStartDate(pSelectedStartDate);
    }
  }, [show, pSelectedStartDate]);

  useEffect(() => {
    if (!show && pSelectedEndDate) {
      setEndDate(pSelectedEndDate);
    }
  }, [show, pSelectedEndDate]);

  function formatTimeToHHMMSS(isoDateString) {
    const dateObj = new Date(isoDateString).toLocaleTimeString();
    return dateObj;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  const getTempStatus = (temp) => {
    if (temp > 0 && temp <= 40) {
      return {
        // status: "Good",
        color: "green",
        textColor: "white",
        image: good,
      };
    } else if (temp > 40) {
      return {
        status: "Very Hot",
        color: "red",
        textColor: "white",
        image: severe,
      };
    }
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.value);
  };
  console.log(startDate, endDate);

  const {
    status: aqiStatusText,
    color,
    textColor,
    image: aqiImage,
  } = tempStatus;

  const rowClassName = (data) => {
    return parseFloat(data.deviationPercentage) > 10 ? "red-row" : "";
  };
  return (
    <div className="aqi-dashboard flex gap-1 flex-column">
      <>
        {show && (
          <Panel toggleable header="Filter By">
            <div className="flex flex-column align-items-end w-full gap-3">
              <div className="flex align-items-center justify-content-between w-full gap-3">
                <div className="flex flex-column">
                  <label htmlFor="location" className="font-semibold">
                    Location
                  </label>
                  <Dropdown
                    value={selectedLocation}
                    options={locations}
                    optionLabel="label"
                    optionValue="value"
                    onChange={(e) => setSelectedLocation(e.value)}
                    placeholder="Select Location"
                  />
                </div>
                <div className="w-full">
                  <div className="p-field text-sm flex flex-column">
                    <label htmlFor="start-date" className="font-semibold">
                      Start Date
                    </label>
                    <Calendar
                      id="start-date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      showIcon
                      dateFormat="dd-mm-yy"
                      placeholder="Select a start date"
                      minDate={new Date("2024-01-01")} // Set the minimum selectable date
                      maxDate={endDate} // Ensure the start date does not go beyond the end date
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="p-field text-sm flex flex-column">
                    <label htmlFor="end-date" className="font-semibold">
                      End Date{" "}
                    </label>
                    <Calendar
                      id="end-date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      showIcon
                      dateFormat="dd-mm-yy"
                      placeholder="Select an end date"
                      minDate={startDate} // Ensure the end date does not go before the start date
                      maxDate={new Date("2024-08-13")} // Set the maximum selectable date
                    />
                  </div>
                </div>
              </div>
              <Button
                severity="success"
                label="Filter"
                icon="pi pi-search"
                onClick={handleSearch}
              />
            </div>
          </Panel>
        )}
        <Panel>
          <div className="flex flex-row align-items-end w-full gap-3 mt-2">
            {selectedLocation && (
              <div>
                <Card title="Temperature" className="text-xs h-17rem">
                  <div className="flex align-items-center justify-content-around flex-row">
                    <div>
                      <div className="flex align-items-center justify-content-center flex-column">
                        <h1 className="text-3xl">
                          {tempValue !== null
                            ? `${tempValue}`
                            : "No Data Found."}
                        </h1>

                        {aqiImage && (
                          <img
                            src={aqiImage}
                            alt={aqiStatusText}
                            style={{ width: "4rem", height: "6rem" }}
                          />
                        )}
                        <h1
                          className={`border-round-xs p-1 text-xs text-white w-6rem`}
                          style={{ backgroundColor: tempStatus.color }}
                        >
                          {tempStatus.status || "No Status"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            <div className="ml-1 mr-1">
              <Card>
                {loading ? (
                  <div className="w-22rem h-15rem">
                    <TableSkeleton />
                  </div>
                ) : (
                  <DataTable
                    value={dataTableData}
                    rowClassName={rowClassName}
                    scrollable
                    scrollHeight="15rem"
                    style={{
                      width: "22rem",
                      height: "15rem",
                      textAlign: "center",
                    }}
                    emptyMessage="No Outliear Days Found."
                  >
                    <Column
                      field="date"
                      header="Date"
                      className="text-xs"
                      headerStyle={{
                        fontSize: "0.6rem",
                        backgroundColor: "#00a269",
                        color: "white",
                      }}
                    ></Column>
                    <Column
                      field="time"
                      header="Time"
                      className="text-xs"
                      headerStyle={{
                        fontSize: "0.6rem",
                        backgroundColor: "#00a269",
                        color: "white",
                      }}
                    />
                    <Column
                      field="aqi"
                      header="Temperature above 40°C"
                      className="text-xs"
                      headerStyle={{
                        fontSize: "0.6rem",
                        backgroundColor: "#00a269",
                        color: "white",
                      }}
                    ></Column>
                    <Column
                      field="deviationPercentage"
                      header="Outlier %"
                      className="text-xs"
                      headerStyle={{
                        fontSize: "0.6rem",
                        backgroundColor: "#00a269",
                        color: "white",
                      }}
                    ></Column>
                  </DataTable>
                )}
              </Card>
            </div>
            <Card>
              {/* <AqiReport
              selectedLocation={selectedLocation}
              startDate={startDate}
              endDate={endDate}
              averageAQI={aqiValue}
            /> */}
              <TempMap
                averageTemp={tempValue}
                selectedLocation={selectedLocation}
              />
            </Card>
          </div>
        </Panel>
        <Panel>
          <div className="flex align-items-center justify-content-between flex-row ">
            <Card>
              {/* <AQIChart
                envirolocation={envirolocation}
                enviroDate={envirodate}
                envirotime={envirotime}
                enviroPM25={enviropm25}
                enviroPM10={enviropm10}
                enviroSO2={enviropm25}
                enviroNO2={enviroNO2}
                enviroco2={enviroco2}
                enviroAQI={enviroAQI}
                selectedLocation={selectedLocation}
              /> */}
            </Card>
          </div>
        </Panel>
        <Panel>
          <div className="flex align-items-center justify-content-between flex-row mt-2">
            {/* <div className="w-100 flex align-items-center justify-content-center flex-row gap-1">
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm25}
                  selectedLocation={selectedLocation}
                  pollutantName="PM2.5"
                  baseChartColor="#FF5722"
                  drilldownChartColor="#FFC107"
                  height={200}
                  width={220}
                  safeLimit={60}
                />
              </Card>
              <Card className="h-15rem w-17rem ">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviropm10}
                  selectedLocation={selectedLocation}
                  pollutantName="PM10"
                  baseChartColor="#4DB6AC"
                  drilldownChartColor="#80CBC4"
                  height={200}
                  width={220}
                  safeLimit={100}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroNO2}
                  selectedLocation={selectedLocation}
                  pollutantName="NO2"
                  baseChartColor="#F44336"
                  drilldownChartColor="#E57373"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
              <Card className="h-15rem w-17rem">
                <PollutantChart
                  envirolocation={envirolocation}
                  envirodate={envirodate}
                  envirotime={envirotime}
                  pollutantData={enviroso2}
                  selectedLocation={selectedLocation}
                  pollutantName="SO2"
                  baseChartColor="#FFEB3B"
                  drilldownChartColor="#FFF176"
                  height={200}
                  width={220}
                  safeLimit={80}
                />
              </Card>
            </div> */}
          </div>
        </Panel>
        {/* {show && (
            <>
              <div className="flex align-items-center justify-content-start flex-row mt-2">
                <Card className="h-15rem w-6">
                  <CustomBarChart
                    title="Human Loss by Age Group and Gender"
                    categories={categories}
                    series={series}
                    height={200}
                    width={500}
                    xtitle="Age Group"
                    ytitle="Number of Losses"
                  />
                </Card>
                <Card className="h-15rem w-6 ml-1 ">
                  <DonutChart
                    title={"Health Impact of NO2"}
                    labels={NO2impactlabels}
                    series={NO2Impactseries}
                    height={200}
                    width={300}
                  />
                </Card>
              </div>
            </>
          )} */}
      </>
    </div>
  );
};

export default TempDashboard;

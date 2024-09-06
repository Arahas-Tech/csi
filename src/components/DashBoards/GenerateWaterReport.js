import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import axios from "axios";
// import ReportPrint from "./ReportPrint"; // Import the ReportPrint component
import Lottie from "lottie-react";
import report_ani from "../animations/Report_ani.json";
import { Button } from "primereact/button";
import RainReportPrint from "./RainReportPrint";
import WaterReportPrint from "./WaterReportPrint";

// Utility functions
const GenerateWaterReport = () => {
  const [visible, setVisible] = useState(false);

  const toggleReportModal = () => {
    setVisible(!visible);
  };

  return (
    <div className="p-fluid align-items-center flex justify-content-center flex-column">
      <Lottie
        animationData={report_ani}
        style={{ height: "20rem", width: "20rem" }}
      />

      <div className="flex flex-column align-items-center w-full gap-3">
        <Button
          severity="success"
          label="Generate Report"
          icon="pi pi-file-pdf"
          className="w-max"
          onClick={toggleReportModal}
        />
      </div>

      {/* Render ReportPrint Component only if all fields are selected */}

      <WaterReportPrint
        visible={visible}
        toggleModalVisibility={toggleReportModal}
        show={true}
      />
    </div>
  );
};

export default GenerateWaterReport;

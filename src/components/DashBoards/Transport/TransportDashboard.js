import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button"; // Assuming Button component is from PrimeReact
import { Card } from "primereact/card";
import BusDashboard from "./BusDashboard";
import RailDashboard from "./RailDashborad";
import Infrastructure from "./Infrastructure";
import { color } from "framer-motion";
import Frequency from "./Frequency";
import Accessibility from "./Accesibility";
import Renewable from "./Renewable";
import Passenger from "./Passenger";
import PrivateVehicle from "./PrivateVehicle";
import Cleanliness from "./Cleanliness";

const RoadComponent = () => (
  <Card title="Road Component">This is the Road component.</Card>
);

const TransportDashboard = () => {
  return (
    <>
      <Panel toggleable header="Infrastructure Quality">
        <Infrastructure />
      </Panel>
      <Panel toggleable header="Accessibility-Mode of Transport">
        <Accessibility />
      </Panel>
      <Panel toggleable header="Frequency of Service">
        <Frequency />
      </Panel>
      <Panel toggleable header="Transport Renewable Energy Enabled">
        <Renewable />
      </Panel>
      <Panel toggleable header="Private Vehicles in Public Transport">
        <PrivateVehicle />
      </Panel>
      <Panel toggleable header="Capacity and Passenger Load">
        <Passenger />
      </Panel>
      {/* <Panel toggleable header="Cost and Fare Structure"></Panel> */}
      <Panel toggleable header="Cleanliness and Maintenance">
        <Cleanliness />
      </Panel>
    </>
  );
};

export default TransportDashboard;

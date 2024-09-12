import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button"; // Assuming Button component is from PrimeReact
import { Card } from "primereact/card";
import BusDashboard from "./BusDashboard";
import RailDashboard from "./RailDashborad";
import Infrastructure from "./Infrastructure";
import { color } from "framer-motion";

const RoadComponent = () => (
  <Card title="Road Component">This is the Road component.</Card>
);

const TransportDashboard = () => {
  return (
    <>
      <Panel toggleable header="Infrastructure Quality">
        <Infrastructure />
      </Panel>
      <Panel toggleable header="Accessibility-Mode of Transport"></Panel>
      <Panel toggleable header="Frequency of Service"></Panel>
      <Panel toggleable header="Transport Renewable Energy Enabled"></Panel>
      <Panel toggleable header="Private Vehicles in Public Transport"></Panel>
      <Panel toggleable header="Capacity and Passenger Load"></Panel>
      <Panel toggleable header="Cost and Fare Structure"></Panel>
      <Panel toggleable header="Cleanliness and Maintenance"></Panel>
    </>
  );
};

export default TransportDashboard;

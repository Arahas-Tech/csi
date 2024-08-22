import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import arahas_logo from "../assets/arahas_logo.png";
import NewUserRegistrationDialog from "../NewRegistrationDialogBox";
import "./LoginModule.css";
import { NavLink } from "react-router-dom";

const LoginHeader = ({ toggleLogin }) => {
  const [visible, setVisible] = useState(false);

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const start = (
    <div className="flex justify-content-start">
      <img src={arahas_logo} alt="Company Logo" height="25" />
    </div>
  );

  const end = (
    <div className="flex justify-content-end gap-5">
      {/* <Button
        label="Know Your City"
        icon="pi pi-question-circle"
        size="small"
        onClick={() => setVisible(true)}
      /> */}
      {/* <NavLink to="/csi/aqi">
      <Button
        label="AQI Module"
        icon="pi pi-objects-column"
        size="small"
      />
      </NavLink> */}
      
      <Button
        label="Login"
        icon="pi pi-user"
        size="small"
        onClick={toggleLogin}
      />
    </div>
  );

  return (
    <>
      <Menubar start={start} end={end} className="flex p-2" />
      <NewUserRegistrationDialog
        visible={visible}
        onHide={() => setVisible(false)}
        number={number}
        setNumber={setNumber}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        location={location}
        setLocation={setLocation}
      />
    </>
  );
};

export default LoginHeader;

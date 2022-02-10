import React, { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import ItemCard from "./components/ItemCard";
import Layout from "./layout/Layout";
import ISmartDevice from "./types/SmartDevice.interface";
import ISmartBulb from "./types/SmartDevicesDetails/SmartBulb.interface";
import ISmartOutlet from "./types/SmartDevicesDetails/SmartOutlet.interface";
import ITempSensor from "./types/SmartDevicesDetails/SmartTemperatureSensor.interface";

// import Interactive from "./utils/Interactive";
function App() {
  const ws = useRef(
    new WebSocket("ws://192.168.0.23:3080/api/v1/refresh")
  ).current;
  console.log(ws);
  const [devices, setDevices] = useState<ISmartDevice[] | []>([]);
  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to the server");
    };
  }, []);
  return (
    <Layout>
      <div className={styles.items__grid}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </Layout>
  );
}

export default App;

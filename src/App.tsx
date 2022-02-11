import React, { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import ItemCard from "./components/ItemCard";
import Layout from "./layout/Layout";
import ISmartDevice from "./types/SmartDevice.interface";
import ISmartBulb from "./types/SmartDevicesDetails/SmartBulb.interface";
import ISmartOutlet from "./types/SmartDevicesDetails/SmartOutlet.interface";
import ITempSensor from "./types/SmartDevicesDetails/SmartTemperatureSensor.interface";
import CardModal from "./components/CardModal";

function App() {
  const [devices, setDevices] = useState<ISmartDevice[] | []>([]);
  const [modal, setModal] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const fetchDevices = async () => {
    try {
      const res = await fetch("http://localhost:3080/api/v1/devices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDevices(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.0.23:3080/api/v1/refresh");
    fetchDevices();
    if (ws) {
      ws.current.onopen = () => {
        console.log("Connected to the server");
      };
    }
  }, []);

  return (
    <Layout>
      <>
        <CardModal open={modal} />
        <div className={styles.items__grid}>
          {devices.map((device) => {
            return (
              <ItemCard
                key={device.id}
                connection={device.connectionState}
                name={device.name}
                type={device.type}
                onClick={() => setModal(!modal)}
              />
            );
          })}
        </div>
      </>
    </Layout>
  );
}

export default App;

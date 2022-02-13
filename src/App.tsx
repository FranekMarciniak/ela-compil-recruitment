import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
  const [deviceWithDetails, setDeviceWithDetails] = useState<
    ISmartBulb | ISmartOutlet | ITempSensor | null
  >(null);
  const [modal, setModal] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const fetchDevices = async () => {
    try {
      const res = await fetch("http://192.168.0.23:3080/api/v1/devices", {
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
  const fetchDeviceWithDetails = async (id: string) => {
    try {
      const res = await fetch(`http://192.168.0.23:3080/api/v1/devices/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setDeviceWithDetails(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    ws.current = new WebSocket("ws://192.168.0.23:3080/api/v1/refresh");
    fetchDevices();
    if (ws !== null) {
      ws.current.onopen = () => {
        console.log("Connected to the server");
      };
      ws.current.onmessage = (ev: MessageEvent) => {
        fetchDevices();
      };
    }
  }, []);

  return (
    <Layout>
      <>
        <CardModal
          open={modal}
          setOpen={setModal}
          data={deviceWithDetails as ISmartOutlet}
        />
        <div className={styles.items__grid}>
          {devices.map((device) => {
            return (
              <ItemCard
                key={device.id}
                connection={device.connectionState}
                name={device.name}
                type={device.type}
                onClick={() => {
                  setModal(true);
                  fetchDeviceWithDetails(device.id);
                }}
              />
            );
          })}
        </div>
      </>
    </Layout>
  );
}

export default App;

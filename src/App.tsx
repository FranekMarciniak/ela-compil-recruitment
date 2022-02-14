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
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  const fetchDevices = async () => {
    try {
      const res = await fetch(
        "https://ela-compil.herokuapp.com/api/v1/devices",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDevices(await res.json());
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  const fetchDeviceWithDetails = async (id: string) => {
    try {
      const res = await fetch(
        `https://ela-compil.herokuapp.com/api/v1/devices/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDeviceWithDetails(await res.json());
    } catch (err) {
      console.log(err);
      setError("Server error");
    }
  };

  useEffect(() => {
    // Saving ws instance to useRef hook
    ws.current = new WebSocket("ws://ela-compil.herokuapp.com/api/v1/refresh");
    // Fetch all devices on component load
    fetchDevices();
    if (ws !== null) {
      ws.current.onopen = () => {
        console.log("Connected to the server");
      };
      return () => {
        // Closing the ws connection as an useEffect cleanup
        (ws.current as WebSocket).close();
      };
    }
  }, []);

  useEffect(() => {
    if (!ws.current) return;
    ws.current.onmessage = (ev: MessageEvent) => {
      // Whenever websocket emits event fetch all devices and check if opened modal contains emitted device,
      // if it does: save it to devicesWithDetails otherwise ignore it, if needed it will be fetched after opening device modal.
      const data = JSON.parse(ev.data);
      fetchDevices();
      if (deviceWithDetails && deviceWithDetails.id === data.id) {
        setDeviceWithDetails(data);
      }
    };
  }, [deviceWithDetails]);

  return (
    <Layout>
      <>
        {error && <h1>{error}</h1>}
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
                active={
                  modal &&
                  deviceWithDetails &&
                  device.id === deviceWithDetails.id
                }
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

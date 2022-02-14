import * as React from "react";
import { useState, useContext } from "react";
import styles from "./App.module.css";
import ItemCard from "./components/ItemCard";
import Layout from "./layout/Layout";
import CardModal from "./components/CardModal";
// import Loading from "./images/loading.svg";
import { GlobalContext } from "./context/global/GlobalState";

function App() {
  const [modal, setModal] = useState(false);
  //Using useContext api for global state
  const { devices, deviceWithDetails, error, fetchDeviceWithDetails } =
    useContext(GlobalContext);

  return (
    <Layout>
      <>
        {error && <h1>{error}</h1>}
        <CardModal open={modal} setOpen={setModal} />
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
                  //Temporary workaround contextAPI initial state types
                  fetchDeviceWithDetails && fetchDeviceWithDetails(device.id);
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

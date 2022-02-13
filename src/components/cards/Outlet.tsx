import React from "react";
import ISmartOutlet from "../../types/SmartDevicesDetails/SmartOutlet.interface";
import Lightning from "../../images/flashlight-line.png";
import styles from "./Outlet.module.css";
type Props = { data: ISmartOutlet };

function Outlet({ data }: Props) {
  return (
    <>
      <div className={styles.connection__wrapper}>
        <p>Turned on:</p>
        <p style={{ marginLeft: "10px" }}>{data.isTurnedOn ? "Yes" : "No"}</p>
      </div>
      <div className={(styles.connection__wrapper, styles.power__wrapper)}>
        <p>Current power usage:</p>
        <br />
        <h4 className={styles.wattage__title}>
          <img src={Lightning} alt={"lightning icon"} />
          {data.powerConsumption}W{" "}
        </h4>
      </div>{" "}
    </>
  );
}

export default Outlet;

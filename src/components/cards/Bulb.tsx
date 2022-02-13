import React from "react";
import ISmartBulb from "../../types/SmartDevicesDetails/SmartBulb.interface";
import styles from "./Bulb.module.css";
type Props = { data: ISmartBulb };

function Bulb({ data }: Props) {
  return (
    <>
      <div className={styles.connection__wrapper}>
        <p>Turned on:</p>
        <p style={{ marginLeft: "10px" }}>{data.isTurnedOn ? "Yes" : "No"}</p>
      </div>
      <div className={styles.brightness__wrapper}>
        <h4 style={{ margin: "10px auto" }}>Brightness:</h4>
        <p
          className={styles.brightness__marker}
          style={{
            marginLeft: `calc(${data.brightness}% - 13px)`,
            transition: "all 0.5s",
          }}
        >
          {data.brightness}
        </p>
        <div className={styles.brightness__bar__wrapper}>
          <div
            className={styles.brightness__bar}
            style={{ width: `${data.brightness}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.color__wrapper}>
        <h4>Color:</h4>
        <div
          className={styles.color__indicator}
          style={{ backgroundColor: data.color }}
        ></div>
      </div>
    </>
  );
}

export default Bulb;

import React from "react";
import TempCold from "../../images/temp-cold.png";
import TempHot from "../../images/temp-hot.png";
import styles from "./TempSensor.module.css";
import ISmartTemperatureSensor from "../../types/SmartDevicesDetails/SmartTemperatureSensor.interface";
type Props = { data: ISmartTemperatureSensor };

function TempSensor({ data }: Props) {
  return (
    <>
      <div
        className={(styles.connection__wrapper, styles.temperature__wrapper)}
      >
        <p>Current power usage:</p>
        <br />
        <h4 className={styles.temperature__title}>
          {data.temperature > 20 ? (
            <img
              src={TempHot}
              className={styles.temperature__img}
              alt={"thermometer icon"}
            />
          ) : (
            <img
              src={TempCold}
              className={styles.temperature__img}
              alt={"thermometer icon"}
            />
          )}
          <span>{data.temperature.toString()}</span>
        </h4>
      </div>{" "}
    </>
  );
}

export default TempSensor;

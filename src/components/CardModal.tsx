import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/global/GlobalState";
import { ICords } from "../types/Cords";
import ISmartOutlet from "../types/SmartDevicesDetails/SmartOutlet.interface";
import Interactive from "../utils/Interactive";
import Close from "../images/close-line.png";
import styles from "./CardModal.module.css";
import cardStyles from "./ItemCard.module.css";
import Outlet from "./cards/Outlet";
import Bulb from "./cards/Bulb";
import TempSensor from "./cards/TempSensor";
import formatConnection from "../utils/connectionFormat";
import ISmartBulb from "../types/SmartDevicesDetails/SmartBulb.interface";
import ISmartTemperatureSensor from "../types/SmartDevicesDetails/SmartTemperatureSensor.interface";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function CardModal({ open, setOpen }: Props) {
  const { deviceWithDetails: data } = useContext(GlobalContext);
  const [cords, setCords] = useState<ICords>({
    x_drag: "0",
    y_drag: "0",
    x_resize: "0",
    y_resize: "0",
    width: "400",
    height: "420",
  });
  const pickCard = (type: string) => {
    switch (type) {
      case "outlet":
        return <Outlet data={data as ISmartOutlet} />;
      case "bulb":
        return <Bulb data={data as ISmartBulb} />;
      case "temperatureSensor":
        return <TempSensor data={data as ISmartTemperatureSensor} />;
      default:
        break;
    }
  };
  return (
    <>
      {open && (
        <Interactive cords={cords} setCords={setCords}>
          <div className={styles.card}>
            {data && (
              <>
                <button
                  className={styles.exit__button}
                  onClick={() => setOpen(false)}
                >
                  <img src={Close} alt="" />
                </button>{" "}
                <h2 className={styles.title__heading}>{data.name}</h2>
                <p className={styles.type__paragraph}>{data.type}</p>
                <div className={styles.connection__wrapper}>
                  <div className={styles.connection__wrapper}>
                    <p>Device status:</p>
                  </div>
                  <p
                    style={{ marginLeft: "10px" }}
                    className={
                      cardStyles[
                        `connection__paragraph--${data.connectionState}`
                      ]
                    }
                  >
                    {formatConnection(data.connectionState)}
                  </p>
                </div>
                {pickCard(data.type)}
              </>
            )}
          </div>
        </Interactive>
      )}
    </>
  );
}

export default CardModal;

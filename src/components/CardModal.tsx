import React, { useState } from "react";
import { ICords } from "../types/Cords";
import ISmartOutlet from "../types/SmartDevicesDetails/SmartOutlet.interface";
import Interactive from "../utils/Interactive";
import Close from "../images/close-line.png";
import styles from "./CardModal.module.css";
import cardStyles from "./ItemCard.module.css";
import Outlet from "./cards/Outlet";
import formatConnection from "../utils/connectionFormat";
import ISmartBulb from "../types/SmartDevicesDetails/SmartBulb.interface";
import ISmartTemperatureSensor from "../types/SmartDevicesDetails/SmartTemperatureSensor.interface";
type Props = {
  open: boolean;
  data: ISmartOutlet | ISmartBulb | ISmartTemperatureSensor;
  setOpen: (open: boolean) => void;
};

function CardModal({ open, data, setOpen }: Props) {
  const [cords, setCords] = useState<ICords>({
    x_drag: "0",
    y_drag: "0",
    x_resize: "0",
    y_resize: "0",
    width: "400",
    height: "400",
  });
  const pickCard = () => {
    switch (data.type) {
      case "outlet":
        return <Outlet data={data} />;
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
                  <p>Device status:</p>
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
                {pickCard()}
              </>
            )}
          </div>
        </Interactive>
      )}
    </>
  );
}

export default CardModal;

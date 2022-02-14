import { createContext, useEffect, useReducer, useRef } from "react";
import globalReducer from "./globalReducer";
import ISmartDevice from "../../types/SmartDevice.interface";
import ISmartBulb from "../../types/SmartDevicesDetails/SmartBulb.interface";
import ISmartOutlet from "../../types/SmartDevicesDetails/SmartOutlet.interface";
import ISmartTempSensor from "../../types/SmartDevicesDetails/SmartTemperatureSensor.interface";
import {
  ADD_ERROR,
  RECIVE_DEVICES,
  RECIVE_DEVICE_WITH_DETAILS,
} from "../types";

export interface IGlobalContext {
  error: null | string;
  devices: ISmartDevice[];
  deviceWithDetails: ISmartBulb | ISmartOutlet | ISmartTempSensor | null;
  //Null for all the methods is possible only in initialState, methods are added to state on init
  fetchDevices?: () => void;
  fetchDeviceWithDetails?: (id: string) => void;
}
const initialState = {
  error: null,
  devices: [],
  deviceWithDetails: null,
};

export const GlobalContext = createContext<IGlobalContext>(initialState);

type Props = {
  children: JSX.Element | JSX.Element[] | null;
};

const GlobalState = (props: Props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
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
      const data = await res.json();
      dispatch({ type: RECIVE_DEVICES, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: ADD_ERROR, payload: "server error" });
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
      const data = await res.json();
      dispatch({ type: RECIVE_DEVICE_WITH_DETAILS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: ADD_ERROR, payload: "server error" });
    }
  };

  useEffect(() => {
    // Saving ws instance to useRef hook
    ws.current = new WebSocket("wss://ela-compil.herokuapp.com/api/v1/refresh");
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
      if (state.deviceWithDetails && state.deviceWithDetails.id === data.id) {
        dispatch({ type: RECIVE_DEVICE_WITH_DETAILS, payload: data });
      }
    };
  }, [state.deviceWithDetails]);

  return (
    <GlobalContext.Provider
      value={{
        devices: state.devices,
        deviceWithDetails: state.deviceWithDetails,
        error: state.error,
        fetchDevices,
        fetchDeviceWithDetails,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;

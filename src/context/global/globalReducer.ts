import {
  ADD_ERROR,
  RECIVE_DEVICES,
  RECIVE_DEVICE_WITH_DETAILS,
} from "../types";
import { IGlobalContext } from "./GlobalState";

const globalReducer = (state: IGlobalContext, action: any) => {
  switch (action.type) {
    case RECIVE_DEVICES:
      return { ...state, devices: action.payload };
    case RECIVE_DEVICE_WITH_DETAILS:
      return { ...state, deviceWithDetails: action.payload };
    case ADD_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default globalReducer;

import Bulb from "../images/lightbulb-line.svg";
import Outlet from "../images/outlet-line.svg";
import Temp from "../images/temp-hot-line.svg";

function imgPicker(type: string): string {
  switch (type) {
    case "bulb":
      return Bulb;
    case "outlet":
      return Outlet;
    case "temperatureSensor":
      return Temp;
    default:
      return Bulb;
  }
}

export default imgPicker;

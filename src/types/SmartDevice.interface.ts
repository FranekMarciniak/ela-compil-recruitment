export default interface ISmartDevice {
  type: "bulb" | "outlet" | "temperatureSensor";
  id: string;
  name: string;
  connectionState: "connected" | "disconnected" | "poorConnection";
}

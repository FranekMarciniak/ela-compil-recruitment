export default interface ISmartTemperatureSensor {
  type: "temperatureSensor";
  id: string;
  name: string;
  connectionState: "connected" | "disconnected" | "poorConnection";
  temperature: number; // in Celsius
}

export default interface ISmartTemperatureSensor {
  type: "temperatureSensor";
  id: string;
  name: string;
  connectionState: string; // 'connected', 'disconnected' or 'poorConnection'
  temperature: number; // in Celsius
}

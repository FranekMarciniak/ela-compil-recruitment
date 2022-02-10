export default interface ISmartDevice {
  type: string; // 'bulb', 'outlet' or 'temperatureSensor';
  id: string;
  name: string;
  connectionState: string; // 'connected', 'disconnected' or 'poorConnection'
}

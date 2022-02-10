export default interface ISmartBulb {
  type: "bulb";
  id: string;
  name: string;
  connectionState: string; // 'connected', 'disconnected' or 'poorConnection'
  isTurnedOn: boolean;
  brightness: number; // <0, 100>
  color: string; // in the CSS formats
}

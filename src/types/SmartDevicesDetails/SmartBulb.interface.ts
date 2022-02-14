export default interface ISmartBulb {
  type: "bulb";
  id: string;
  name: string;
  connectionState: "connected" | "disconnected" | "poorConnection";
  isTurnedOn: boolean;
  brightness: number; // <0, 100>
  color: string; // in the CSS formats
}

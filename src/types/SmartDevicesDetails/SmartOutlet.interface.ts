export default interface ISmartOutlet {
  type: "outlet";
  id: string;
  name: string;
  connectionState: "connected" | "disconnected" | "poorConnection";
  isTurnedOn: boolean;
  powerConsumption: number; // in watts
}

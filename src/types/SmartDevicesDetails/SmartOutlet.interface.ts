export default interface ISmartOutlet {
  type: "outlet";
  id: string;
  name: string;
  connectionState: string; // 'connected', 'disconnected' or 'poorConnection'
  isTurnedOn: boolean;
  powerConsumption: number; // in watts
}

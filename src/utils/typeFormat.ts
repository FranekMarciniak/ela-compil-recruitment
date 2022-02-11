function formatType(type: string): string {
  switch (type) {
    case "bulb":
      return type;
    case "outlet":
      return type;
    case "temperatureSensor":
      return "temperature Sensor";
    default:
      return type;
  }
}

export default formatType;

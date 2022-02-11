function formatConnection(connection: string): string {
  switch (connection) {
    case "connected":
      return connection;
    case "disconnected":
      return connection;
    case "poorConnection":
      return "poor Connection";
    default:
      return connection;
  }
}

export default formatConnection;

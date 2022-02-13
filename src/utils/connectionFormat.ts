function formatConnection(connection: string): string {
  switch (connection) {
    case "connected":
      return connection;
    case "disconnected":
      return connection;
    case "poorConnection":
      return "poor connection";
    default:
      return connection;
  }
}

export default formatConnection;

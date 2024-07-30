"use client";

import { useSocket } from "./providers/socket-provider";

function SocketIndicator() {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return <p className="bg-orange-500 px-2 rounded-medium">Reconecting</p>;
  }

  return <p className="bg-emerald-400 px-2 rounded-medium">Live</p>;
}

export default SocketIndicator;

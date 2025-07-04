import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (userId: string) => {
  const socketRef = useRef<Socket>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3000", {
      query: { userId },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
};

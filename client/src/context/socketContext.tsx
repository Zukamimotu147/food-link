import React, { createContext, useContext, useEffect, useState } from 'react';

import { io, type Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io('http://localhost:3000', { transports: ['websocket'] });
      return newSocket;
    };

    const newSocket = initializeSocket();

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  return useContext(SocketContext);
};

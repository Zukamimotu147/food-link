import { Server as SocketIOServer } from 'socket.io';

export const initSocket = (io: SocketIOServer) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
      console.log('User  disconnected');
    });
  });
};

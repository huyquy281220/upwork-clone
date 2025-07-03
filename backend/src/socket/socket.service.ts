import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class SocketService {
  private io: Server;

  setServer(io: Server) {
    this.io = io;
  }

  emitToUser(userId: string, event: string, data: any) {
    this.io.to(userId).emit(event, data);
  }
}

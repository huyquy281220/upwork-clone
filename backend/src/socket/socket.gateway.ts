import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  server: Server;

  afterInit(server: Server) {
    this.server = server;
    console.log('Socket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // Example: join room by userId sent as query param
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(userId);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Emit notification function
  sendNotificationToUser(userId: string, data: any) {
    this.server.to(userId).emit('new_notification', data);
  }
}

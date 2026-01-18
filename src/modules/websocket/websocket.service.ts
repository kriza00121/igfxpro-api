import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
  server: Server;

  init(server: Server) {
    this.server = server;
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);
    });
  }

  emitPriceUpdate(data: any) {
    this.server.emit('price-update', data);
  }
}

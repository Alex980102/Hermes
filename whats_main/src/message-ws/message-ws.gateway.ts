import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SendparamsService } from 'src/sendparams/sendparams.service';
import { MessageWsService } from './message-ws.service';

@WebSocketGateway({ cors: true })
export class MessageWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageWsService: MessageWsService, private readonly sendParamService: SendparamsService) {}
  
  handleConnection(client: Socket) {
    this.messageWsService.registerClient(client);
    console.log({ Conectados: this.messageWsService.getConnectedClients() });
    if (this.messageWsService.getConnectedClients() == 2) {
      this.sendParamService.update(0, {minValue:6, maxValue:11})
      console.log('Valores random seteados por defecto');
    }
  }
  handleDisconnect(client: Socket) {
    this.messageWsService.removeClient(client.id);
    console.log({ Conectados: this.messageWsService.getConnectedClients() });
    if (this.messageWsService.getConnectedClients() == 1) {
      console.log('Mandar mensaje para pedir ayuda de esclavos');
      this.sendParamService.update(0, {minValue:70, maxValue:71})
    } 
    if (this.messageWsService.getConnectedClients() == 0) {
      console.log('No hay esclavos para mandar mensaje valor de espera = 5 minutos');
      // FIX: cambiar los valores min y max por 500 y 501
      this.sendParamService.update(0, {minValue:4, maxValue:8})
    }
  }
}

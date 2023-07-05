import dotenv from 'dotenv';
import { tcpServer } from './tcp';
import { udpServer } from './udp';

dotenv.config();
const tcpPort: number = parseInt(process.env.TCP_SERVER_PORT || '4000');
const udpPort: number = parseInt(process.env.UDP_SERVER_PORT || '4001');

tcpServer.listen(tcpPort, () => {
  console.log("🚀 TCP server is running!!");
});

udpServer.on('listening', () => {
  console.log("🚀 UDP server is running!!");
});

udpServer.bind(udpPort);
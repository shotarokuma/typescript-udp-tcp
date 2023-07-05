import net, { Socket } from 'net';

export const tcpServer = net.createServer((socket : Socket) => {
  socket.on('data', (stream) => {
    console.log(`${stream.toString()} form the tcp client`);
    socket.write("back at you");
  });
});
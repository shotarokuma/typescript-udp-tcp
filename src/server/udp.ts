import dgram, { RemoteInfo } from "dgram";

export const udpServer = dgram.createSocket("udp4");

udpServer.on("message", (msg: Buffer, remote: RemoteInfo) => {
  console.log(`${msg.toString()} from the udp client`);
  udpServer.send("back at you",remote.port, remote.address);
});

import dgram from "dgram";

const MESSAGE = "hello";

type sendHelloUDPArgs = {
  host: string;
  port: number;
};

export const sendHelloUDP = ({
  host,
  port,
}: sendHelloUDPArgs): Promise<number> => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    const client = dgram.createSocket("udp4");

    client.send(MESSAGE, port, host);

    client.on("message", () => {
      const endTime = new Date().getTime();
      client.close();
      resolve(endTime - startTime);
    });

    client.on("error", (error) => {
      reject(error);
    });
  });
};

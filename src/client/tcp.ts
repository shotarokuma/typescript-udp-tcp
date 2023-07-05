import { Socket } from "net";

const MESSAGE = "hello";

type sendHelloTCPArgs = {
  host: string;
  port: number;
};

export const sendHelloTCP = ({
  host,
  port,
}: sendHelloTCPArgs): Promise<number> => {
  return new Promise((resolve, reject) => {
    const startTime = new Date().getTime();
    const client = new Socket();

    client.connect(port, host, () => {
      client.write(MESSAGE);
    });

    client.on("data", (data) => {
      const endTime = new Date().getTime();
      client.destroy();
      resolve(endTime - startTime);
    });

    client.on("error", (error) => {
      reject(error);
    });
  });
};

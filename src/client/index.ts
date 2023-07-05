import dotenv from "dotenv";
import { sendHelloTCP } from "./tcp";
import { sendHelloUDP } from "./udp";
dotenv.config();

const host = process.env.HOST_NAME || "localhost";
const tcpPort = parseInt(process.env.TCP_SERVER_PORT || "4000");
const udpPort = parseInt(process.env.UDP_SERVER_PORT || "4001");

const main = async () => {
  let rrt = 0;
  let res: number[] = [];
  const udps: Promise<number>[] = [];
  const tcps: Promise<number>[] = [];

  for (let i = 0; i < 1000; i++) {
    tcps.push(sendHelloTCP({ host: host, port: tcpPort }));
    udps.push(sendHelloUDP({ host: host, port: udpPort }));
  }
  try {
    console.log("a)");

    rrt = await sendHelloTCP({ host: host, port: tcpPort });
    console.log("TCP takes:", rrt);
    rrt = await sendHelloUDP({ host: host, port: udpPort });
    console.log("UDP takes:", rrt);

    console.log("c)");

    res = await Promise.all(tcps);
    console.log("TCP's MAX:", Math.max(...res));
    console.log("TCP's MIN:", Math.min(...res));
    console.log("TCP's AVG:", res.reduce((acc, curr) => acc + curr) / 1000);
    res = await Promise.all(udps);
    console.log("UDP's MAX:", Math.max(...res));
    console.log("UDP's MIN:", Math.min(...res));
    console.log("UDP's AVG:", res.reduce((acc, curr) => acc + curr) / 1000);

    console.log("d)");


    const result = await Promise.all([
      sendHelloTCP({ host: host, port: tcpPort }),
      sendHelloUDP({ host: host, port: tcpPort }),
    ]);

    console.log(result)
  } catch (err) {
    console.log(err);
  }
};

main();

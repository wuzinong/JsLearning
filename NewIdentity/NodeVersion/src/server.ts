import { generateCertificate } from "@veracity/node-auth";
import { RequestListener } from "http";
import https from "https";

export const createServer = (
  requestListener: RequestListener,
  portOrPipe: number | string
) => {
  const server = https.createServer(
    {
      ...generateCertificate(),
    },
    requestListener
  );
  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });

  server.listen(portOrPipe, () => {
    console.log("Server listiening for connections");
  });
  return server;
};

export default createServer;

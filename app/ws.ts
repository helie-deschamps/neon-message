import { Server } from "socket.io"
import onConnection from "./onConnection"

import { createServer } from "node:http";
import next from "next";

const development = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev: development, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
	const httpServer = createServer(handler);

	const io = new Server(httpServer);

	io.on("connection", onConnection);

	httpServer
		.once("error", (error) => {
			console.error(error);
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(1);
		})
		.listen(port, () => {
			console.log(`> Ready on http://${hostname}:${port}`);
		});
});
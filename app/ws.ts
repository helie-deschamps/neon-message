import { Server } from "socket.io"
import onConnection from "./onConnection"

const io = new Server(3000, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
})

io.on("connection", onConnection)

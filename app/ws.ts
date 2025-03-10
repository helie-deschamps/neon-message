import { Server } from "socket.io"
import changeUsername from "./events/changeUsername"
import usersList from "./usersList"
import newUser from "./events/newUser"
import startTyping from "./events/startTyping"
import endTyping from "./events/endTyping"
import sendingMessage from "./events/sendingMessage"

const io = new Server(3000, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
})

io.on("connection", socket => {
	const publicId = socket.id

	newUser(socket, publicId)

	socket.on("change_username", (data: string) => changeUsername(data, publicId))
	socket.on("start_typing", () => startTyping(publicId))
	socket.on("end_typing", () => endTyping(publicId))
	socket.on("sending_message", (data: string) => sendingMessage(data, publicId))

	socket.on("disconnect", () => {
		delete usersList[publicId]
	})
})

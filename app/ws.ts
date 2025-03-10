import { Server } from "socket.io"
import changeUsername from "./events/changeUsername"
import usersList from "./usersList"
import newUser from "./events/newUser"

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

	socket.on("disconnect", () => {
		delete usersList[publicId]
	})
})

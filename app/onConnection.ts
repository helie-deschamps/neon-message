import { Socket } from "socket.io"
import newUser from "./events/newUser"
import changeUsername from "./events/changeUsername"
import startTyping from "./events/startTyping"
import endTyping from "./events/endTyping"
import sendingMessage from "./events/sendingMessage"
import usersList from "./usersList"
import spreadEventForAll from "./spreadEventForAll"

function onConnection(socket: Socket) {
	const publicId = socket.id

	newUser(socket, publicId)

	const localUsersList = []
	for (const publicId of Object.keys(usersList)) {
		const { username } = usersList[publicId]
		localUsersList.push({ publicId, username })
	}
	spreadEventForAll("updating_users_list", localUsersList)

	socket.on("change_username", (data: string) => changeUsername(data, publicId))
	socket.on("start_typing", () => startTyping(publicId))
	socket.on("end_typing", () => endTyping(publicId))
	socket.on("sending_message", (data: string) => sendingMessage(data, publicId))

	socket.on("disconnect", () => {
		delete usersList[publicId]
	})
}

export default onConnection

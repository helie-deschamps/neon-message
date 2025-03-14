import usersList from "../usersList"
import { Socket } from "socket.io"
import spreadUsersForAll from "../spreadUsersForAll"

function newUser(socket: Socket, publicId: string) {
	usersList[publicId] = {
		publicId: publicId,
		wsInstance: socket,
	}

	spreadUsersForAll()
}

export default newUser

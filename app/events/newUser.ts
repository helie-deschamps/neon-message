import usersList from "../usersList"
import { Socket } from "socket.io"

function newUser(socket: Socket, publicId: string) {
	usersList[publicId] = {
		publicId: publicId,
		wsInstance: socket,
	}
}

export default newUser

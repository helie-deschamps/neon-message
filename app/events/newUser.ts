import usersList from "../usersList"
import { Socket } from "socket.io"

function newUser(socket: Socket, secretId: string) {
	console.log(usersList)
	usersList[secretId] = {
		secretId: secretId,
		wsInstance: socket,
	}
	console.log(usersList)
}

export default newUser

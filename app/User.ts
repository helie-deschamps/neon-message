import { Socket } from "socket.io"

type PublicId = string

type User = {
	publicId: PublicId
	username?: string
	wsInstance: Socket
}

export default User
export { type PublicId }

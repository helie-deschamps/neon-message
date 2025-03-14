import { Dispatch, SetStateAction } from "react"

function onStartedTyping(
	data: string,
	usersTyping: string[],
	setUsersTyping: Dispatch<SetStateAction<string[]>>,
) {
	const { v }: { v: { username: string } } = JSON.parse(data)
	console.log("usersTyping")
	setUsersTyping([...usersTyping, v.username])
}

export default onStartedTyping

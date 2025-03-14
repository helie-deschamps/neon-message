import { Dispatch, SetStateAction } from "react"

function onUpdatingUserList(
	data: string,
	setUsersList: Dispatch<SetStateAction<{publicId:string, username: string | undefined}[]>>,
) {
	console.log(JSON.parse(data))
	setUsersList(JSON.parse(data))
}

export default onUpdatingUserList

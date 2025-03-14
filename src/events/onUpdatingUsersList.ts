import { Dispatch, SetStateAction } from "react"

function onUpdatingUserList(
	data: string,
	setUsersList: Dispatch<SetStateAction<{publicId:string, username: string | undefined}[]>>,
	setCurrentPublicId: Dispatch<SetStateAction<string | undefined>>, setCurrentUsername: Dispatch<SetStateAction<string | undefined>>

) {
	const { v, you } = JSON.parse(data)
	setCurrentPublicId(you.publicId)
	setCurrentUsername(you.username)
	setUsersList(v)
}

export default onUpdatingUserList

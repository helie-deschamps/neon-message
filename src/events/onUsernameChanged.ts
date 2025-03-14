import { Dispatch, SetStateAction } from "react"

function onUsernameChanged(
	data: string,
	usersList: {publicId:string, username: string | undefined}[],
	setUsersList: Dispatch<SetStateAction<{publicId:string, username: string | undefined}[]>>,
	setCurrentPublicId: Dispatch<SetStateAction<string | undefined>>, setCurrentUsername: Dispatch<SetStateAction<string | undefined>>
) {
	const userData: {newUsername: string, id: string, isYou: boolean} = JSON.parse(data)
	if (!usersList.some(user => user.publicId === userData.id)) {
		usersList.push({ publicId: userData.id, username: userData.newUsername})
	}
	if(userData.isYou) {
		setCurrentPublicId(userData.id)
		setCurrentUsername(userData.newUsername)
	}
	const newUserList = usersList.map(user => {
		if (user.publicId === userData.id) {
			return { ...user, username: userData.newUsername }
		}
		return user
	})
	setUsersList(newUserList)
}

export default onUsernameChanged

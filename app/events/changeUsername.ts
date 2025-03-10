import { PublicId } from "../User"
import usersList from "../usersList"

type userConnectDatas = {
	newUsername: string
}

function changeUsername(data: string, publicId: PublicId) {
	const { newUsername }: userConnectDatas = JSON.parse(data)
	usersList[publicId].username = newUsername
	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit("username_changed", JSON.stringify({
			id: publicId,
			newUsername,
		}))
	}
}

export default changeUsername

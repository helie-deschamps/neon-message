import { PublicId } from "../User"
import usersList from "../usersList"

function endTyping(publicId: PublicId) {
	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit(
			"ended_typing",
			JSON.stringify({
				id: publicId,
			}),
		)
	}
}

export default endTyping

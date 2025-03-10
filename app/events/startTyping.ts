import { PublicId } from "../User"
import usersList from "../usersList"

function startTyping(publicId: PublicId) {
	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit(
			"stared_typing",
			JSON.stringify({
				id: publicId,
			}),
		)
	}
}

export default startTyping

import { PublicId } from "../User"
import spreadEventForAll from "../spreadEventForAll"
import usersList from "../usersList"

function startTyping(publicId: PublicId) {
	const username = usersList[publicId].username
	spreadEventForAll("stared_typing", { username }, publicId)
}

export default startTyping

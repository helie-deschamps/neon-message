import { PublicId } from "../User"
import spreadEventForAll from "../spreadEventForAll"
import usersList from "../usersList"

function endTyping(publicId: PublicId) {
	const username = usersList[publicId].username
	spreadEventForAll("ended_typing", { username }, publicId)
}

export default endTyping

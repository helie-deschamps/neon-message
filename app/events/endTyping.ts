import { PublicId } from "../User"
import spreadEventForAll from "../spreadEventForAll"

function endTyping(publicId: PublicId) {
	spreadEventForAll("ended_typing", undefined, publicId)
}

export default endTyping

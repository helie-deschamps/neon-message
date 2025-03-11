import { PublicId } from "../User"
import spreadEventForAll from "../spreadEventForAll"

function startTyping(publicId: PublicId) {
	spreadEventForAll("stared_typing", undefined, publicId)
}

export default startTyping

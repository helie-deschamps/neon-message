import { PublicId } from "../User"
import spreadEventForAll from "../spreadEventForAll"

type SendingMessageDatas = {
	message: string
}

function sendingMessage(data: string, publicId: PublicId) {
	const { message }: SendingMessageDatas = JSON.parse(data)

	spreadEventForAll("message_sent", { message }, publicId)
}

export default sendingMessage

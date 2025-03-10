import { PublicId } from "../User"
import usersList from "../usersList"

type SendingMessageDatas = {
	message: string
}

function sendingMessage(data: string, publicId: PublicId) {
	const { message }: SendingMessageDatas = JSON.parse(data)

	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit(
			"message_sent",
			JSON.stringify({
				id: publicId,
				message
			}),
		)
	}
}

export default sendingMessage

import { PublicId } from "../User"
import usersList from "../usersList"
import spreadEventForAll from "../spreadEventForAll"

type ChangeUsernameDatas = {
	newUsername: string
}

function changeUsername(data: string, publicId: PublicId) {
	const { newUsername }: ChangeUsernameDatas = JSON.parse(data)
	usersList[publicId].username = newUsername

	spreadEventForAll("username_changed", { newUsername }, publicId)
}

export default changeUsername

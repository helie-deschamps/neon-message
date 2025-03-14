import { PublicId } from "../User"
import usersList from "../usersList"
import spreadUsersForAll from "../spreadUsersForAll"

type ChangeUsernameDatas = {
	newUsername: string
}

function changeUsername(data: string, publicId: PublicId) {
	const { newUsername }: ChangeUsernameDatas = JSON.parse(data)
	usersList[publicId].username = newUsername

	spreadUsersForAll()
}

export default changeUsername

import usersList from "./usersList"
import spreadEventForAll from "./spreadEventForAll"

function spreadUsersForAll() {
	const localUsersList = []
	for (const publicId of Object.keys(usersList)) {
		const { username } = usersList[publicId]
		localUsersList.push({ publicId, username })
	}
	spreadEventForAll("updating_users_list", localUsersList)
}

export default spreadUsersForAll

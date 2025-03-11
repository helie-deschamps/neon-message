import { Dispatch, SetStateAction } from "react"

function onUsernameChanged(
	data: string,
	setCurrentUsername: Dispatch<SetStateAction<string | undefined>>,
) {
	setCurrentUsername(data)
}

export default onUsernameChanged

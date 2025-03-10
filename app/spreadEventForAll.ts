import usersList from "./usersList"

function spreadEventForAll(
	eventName: string,
	datas?: object,
	publicId?: string,
) {
	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit(
			eventName,
			JSON.stringify({
				id: publicId,
				...datas,
			}),
		)
	}
}

export default spreadEventForAll

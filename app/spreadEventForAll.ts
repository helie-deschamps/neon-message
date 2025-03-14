import usersList from "./usersList"

function spreadEventForAll(
	eventName: string,
	datas?: object,
	publicId?: string,
	sayIsYou: boolean = false,
) {
	for (const userId of Object.keys(usersList)) {
		usersList[userId].wsInstance.emit(
			eventName,
			JSON.stringify({
				...datas,
				id: publicId,
				isYou: sayIsYou && userId === publicId
			}),
		)
	}
}

export default spreadEventForAll

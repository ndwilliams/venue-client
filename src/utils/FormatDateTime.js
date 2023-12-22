export const formatFullDateTime = (dateTimeString) => {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}
	const formattedDate = new Date(dateTimeString).toLocaleDateString(
		"en-US",
		options
	)
	return formattedDate
}

export const formatHour = (dateTimeString) => {
	const options = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	}

	const formattedTime = new Date(dateTimeString).toLocaleDateString(
		"en-US",
		options
	)

	const formattedTimeArray = formattedTime.split(" ")
	const formattedTimeOnly = formattedTimeArray[1] + " " + formattedTimeArray[2]
	return formattedTimeOnly
}

export const formatDate = (dateTimeString) => {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	}

	const formattedDate = new Date(dateTimeString).toLocaleDateString(
		"en-US",
		options
	)

	const formattedDateArray = formattedDate.split(" ")

	const formattedDateOnly =
		formattedDateArray[0] +
		" " +
		formattedDateArray[1] +
		" " +
		formattedDateArray[2]
	return formattedDateOnly
}

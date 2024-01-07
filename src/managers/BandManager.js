export const getAllBands = () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/bands`, {
			headers: {
				Authorization: `Token ${currentUser.token}`,
			},
		}).then((res) => res.json())
	}
}

export const addNewBand = async (newBand) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(`http://localhost:8000/bands`, {
			method: "POST",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBand),
		})
		return response
	}
}

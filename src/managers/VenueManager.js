export const getAllVenues = () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/venues`, {
			headers: {
				Authorization: `Token ${currentUser.token}`,
			},
		}).then((res) => res.json())
	}
}

export const getVenueById = (venueId) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/venues/${venueId}`, {
			headers: {
				Authorization: `Token ${currentUser.token}`,
			},
		}).then((res) => res.json())
	}
}

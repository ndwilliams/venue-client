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

export const editVenue = async (venue) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(`http://localhost:8000/venues/${venue.id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(venue),
		})
		return response
	}
}

export const addVenue = async (newVenue) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(`http://localhost:8000/venues`, {
			method: "POST",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newVenue),
		})
		return response
	}
}

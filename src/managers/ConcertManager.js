export const getAllConcerts = () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	let url = ""
	if (currentUser && currentUser.token && currentUser.is_staff) {
		url = `http://localhost:8000/concerts?user=admin`
	} else {
		url = `http://localhost:8000/concerts`
	}
	return fetch(url, {
		headers: {
			Authorization: `Token ${currentUser.token}`,
		},
	}).then((res) => res.json())
}

export const getConcertById = (concertId) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/concerts/${concertId}`, {
			headers: {
				Authorization: `Token ${currentUser.token}`,
			},
		}).then((res) => res.json())
	}
}

export const addConcert = async (concert) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(`http://localhost:8000/concerts`, {
			method: "POST",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
			body: concert,
		})
		return response
	}
}

export const editConcert = async (concert) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(
			`http://localhost:8000/concerts/${concert.id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Token ${currentUser.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(concert),
			}
		)
		return response
	}
}

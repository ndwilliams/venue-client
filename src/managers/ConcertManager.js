export const getAllConcerts = () => {
	return fetch(`http://localhost:8000/concerts`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	}).then((res) => res.json())
}

export const getConcertById = (concertId) => {
	return fetch(`http://localhost:8000/concerts/${concertId}`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	}).then((res) => res.json())
}

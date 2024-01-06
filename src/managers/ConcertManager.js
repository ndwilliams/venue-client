export const getAllConcerts = () => {
	const is_staff = localStorage.getItem("is_staff")
	let url = ""
	if (is_staff === "true") {
		url = `http://localhost:8000/concerts?user=admin`
	} else {
		url = `http://localhost:8000/concerts`
	}
	return fetch(url, {
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

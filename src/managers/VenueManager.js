export const getAllVenues = () => {
	return fetch(`http://localhost:8000/venues`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	}).then((res) => res.json())
}

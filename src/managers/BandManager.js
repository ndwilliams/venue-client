export const getAllBands = () => {
	return fetch(`http://localhost:8000/bands`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	}).then((res) => res.json())
}

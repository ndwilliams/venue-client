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

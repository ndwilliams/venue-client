export const getProfileByUserId = (userId, token) => {
	return fetch(`http://localhost:8000/users/${userId}`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	}).then((res) => res.json())
}

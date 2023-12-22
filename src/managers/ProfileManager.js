export const getProfileByUserId = (userId, token) => {
	return fetch(`http://localhost:8000/users/${userId}`, {
		headers: {
			Authorization: `Token ${token}`,
		},
	}).then((res) => res.json())
}

export const editUser = (updatedUser, token, userId) => {
	return fetch(`http://localhost:8000/users/${userId}`, {
		method: "PUT",
		headers: {
			Authorization: `Token ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedUser),
	})
}

export const getAllFavorites = async () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(`http://localhost:8000/favorites`, {
			headers: {
				Authorization: `Token ${currentUser.token}`,
			},
		})
		const favoritedconcerts = await response.json()
		const sortedfavoritedconcerts = favoritedconcerts.sort(
			(a, b) =>
				new Date(a.concert.show_starts) - new Date(b.concert.show_starts)
		)
		return sortedfavoritedconcerts
	}
}

export const getCurrentUserFavorites = async () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		const response = await fetch(
			`http://localhost:8000/favorites?user=current`,
			{
				headers: {
					Authorization: `Token ${currentUser.token}`,
				},
			}
		)
		const favoritedconcerts = await response.json()
		const sortedfavoritedconcerts = favoritedconcerts.sort(
			(a, b) =>
				new Date(a.concert.show_starts) - new Date(b.concert.show_starts)
		)
		return sortedfavoritedconcerts
	}
}

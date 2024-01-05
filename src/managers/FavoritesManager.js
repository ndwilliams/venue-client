export const getAllFavorites = async () => {
	const response = await fetch(`http://localhost:8000/favorites`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	})
	const favoritedconcerts = await response.json()
	const sortedfavoritedconcerts = favoritedconcerts.sort(
		(a, b) => new Date(a.concert.show_starts) - new Date(b.concert.show_starts)
	)
	return sortedfavoritedconcerts
}

export const getCurrentUserFavorites = async () => {
	const response = await fetch(`http://localhost:8000/favorites?user=current`, {
		headers: {
			Authorization: `Token ${localStorage.getItem("auth_token")}`,
		},
	})
	const favoritedconcerts = await response.json()
	const sortedfavoritedconcerts = favoritedconcerts.sort(
		(a, b) => new Date(a.concert.show_starts) - new Date(b.concert.show_starts)
	)
	return sortedfavoritedconcerts
}

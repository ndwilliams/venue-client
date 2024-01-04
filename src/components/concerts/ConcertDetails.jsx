import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getConcertById } from "../../managers/ConcertManager"
import { formatDate, formatHour } from "../../utils/FormatDateTime"
import { getAllFavorites } from "../../managers/FavoritesManager"
import concertFavorite from "../../assets/favorite.png"
import concertUnFavorite from "../../assets/unfavorite.png"

export const ConcertDetails = ({ userId }) => {
	const [chosenConcert, setChosenConcert] = useState({})
	const [favorites, setFavorites] = useState([])
	const { concertId } = useParams()
	const navigate = useNavigate()

	const fetchAndSetConcert = () => {
		getConcertById(concertId).then((concertObj) => setChosenConcert(concertObj))
	}

	const fetchAndSetFavorites = () => {
		getAllFavorites().then((favoritesArray) => {
			setFavorites(favoritesArray)
		})
	}

	const handleFavorite = async () => {
		const favoriteObject = {
			user: userId,
			concert: concertId,
		}
		await fetch(`http://localhost:8000/favorites`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("auth_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(favoriteObject),
		})
		fetchAndSetConcert()
		fetchAndSetFavorites()
	}

	const handleUnfavorite = async () => {
		const favorite = favorites.find(
			(obj) =>
				obj.concert.id === chosenConcert.id && obj.user_id === parseInt(userId)
		)
		console.log(favorite)
		await fetch(`http://localhost:8000/favorites/${favorite.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${localStorage.getItem("auth_token")}`,
				"Content-Type": "application/json",
			},
		})
		fetchAndSetConcert()
		fetchAndSetFavorites()
	}

	useEffect(() => {
		fetchAndSetConcert()
		fetchAndSetFavorites()
	}, [])

	return (
		<section
			key={chosenConcert.id}
			className="mx-auto w-1/2 text-center font-sans text-lg content-center
        my-10 bg-blue-400 bg-opacity-80 rounded-3xl">
			<div className="headlining-band p-1">{chosenConcert.band?.name}</div>
			<div className="opening-bands p-0.5">
				With:
				{chosenConcert.opening_bands?.map((openerObj) => {
					return (
						<div key={openerObj.id} className="opener-name p-0.5">
							{openerObj.name}
						</div>
					)
				})}
			</div>
			<div className="venue-name p-1">At: {chosenConcert.venue?.name}</div>
			<div className="concert-date p-1">
				{formatDate(chosenConcert.show_starts)}
			</div>
			<div className="doors-open-time p-1">
				<span>Doors Open: </span>
				{formatHour(chosenConcert.doors_open)}
			</div>
			<div className="concert-start-time p-1">
				<span>Show Starts: </span>
				{formatHour(chosenConcert.show_starts)}
			</div>
			<div className="">
				{chosenConcert.current_user_is_favorited ? (
					<div className="unfavorite-container flex items-center justify-center gap-4 w-[220px]">
						<button className="" onClick={handleUnfavorite}>
							<img src={concertUnFavorite} alt="Unfavorite Concert" />
						</button>
					</div>
				) : (
					<div className="favorite-container flex items-center justify-center gap-4 w-[220px]">
						<button className="" onClick={handleFavorite}>
							<img src={concertFavorite} alt="Favorite Concert" />
						</button>
					</div>
				)}
			</div>
			<div>
				<button type="button" onClick={() => navigate(`/${concertId}/edit`)}>
					Edit Concert
				</button>
			</div>
		</section>
	)
}

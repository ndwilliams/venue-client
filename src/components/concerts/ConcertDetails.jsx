import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getConcertById } from "../../managers/ConcertManager"
import { formatDate, formatHour } from "../../utils/FormatDateTime"
import {
	addFavorite,
	deleteFavorite,
	getAllFavorites,
} from "../../managers/FavoritesManager"
import Favorited from "../../assets/favorited.png"
import UnFavorited from "../../assets/unfavorited.png"

export const ConcertDetails = ({ currentUser }) => {
	const [chosenConcert, setChosenConcert] = useState({})
	const [favorites, setFavorites] = useState([])
	const [transitionClass, setTransitionClass] = useState("")
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

	const handleAddFavorite = async (event) => {
		event.preventDefault()
		const favoriteObject = {
			user: currentUser.user_id,
			concert: concertId,
		}
		setTransitionClass("transition-once")
		await addFavorite(favoriteObject)
		fetchAndSetFavorites()
		fetchAndSetConcert()
		setTimeout(() => {
			setTransitionClass("")
		}, 250)
	}

	const handleUnfavorite = async () => {
		const favorite = favorites.find(
			(obj) =>
				obj.concert.id === chosenConcert.id &&
				obj.user_id === parseInt(currentUser.user_id)
		)

		await deleteFavorite(favorite)
		setTransitionClass("transition-once")
		fetchAndSetFavorites()
		fetchAndSetConcert()
		setTimeout(() => {
			setTransitionClass("")
		}, 250)
	}

	useEffect(() => {
		fetchAndSetConcert()
		fetchAndSetFavorites()
	}, [])

	return (
		<section
			key={chosenConcert.id}
			className="mx-auto w-1/2 text-center font-sans text-lg font-semibold content-center
        my-10 bg-amber-500 bg-opacity-80 rounded-3xl py-4">
			<div className="headlining-band text-2xl">{chosenConcert.band?.name}</div>
			<div className="concert-date italic py-1">
				{formatDate(chosenConcert.show_starts)}
			</div>
			<div>With:</div>
			<div className="opening-bands flex justify-around py-2">
				{chosenConcert.opening_bands?.map((openerObj) => {
					return (
						<div key={openerObj.id} className="opener-name ">
							{openerObj.name}
						</div>
					)
				})}
			</div>
			<div className="venue-name p-1 text-xl">
				At: {chosenConcert.venue?.name}
			</div>
			<div className="concert-start-time p-1 text-xl">
				<span>Show Starts: </span>
				{formatHour(chosenConcert.show_starts)}
			</div>
			<div className="doors-open-time p-1">
				<span>Doors Open: </span>
				{formatHour(chosenConcert.doors_open)}
			</div>

			<div className="">
				{chosenConcert.current_user_is_favorited ? (
					<div className="unfavorite-container flex items-center justify-center">
						<button
							className={`w-40 h-40 relative group ${transitionClass}`}
							onClick={handleUnfavorite}>
							<img
								src={UnFavorited}
								alt="Unfavorite Concert"
								className="h-100% w-100% object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>

							<img
								src={Favorited}
								alt="Favorite Concert"
								className="h-100% w-100% object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
							/>
						</button>
					</div>
				) : (
					<div className="favorite-container flex items-center justify-center">
						<button
							className={`w-40 h-40 relative group ${transitionClass}`}
							onClick={handleAddFavorite}>
							<img
								src={Favorited}
								alt="Favorite Concert"
								className="h-100% w-100% object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
							/>

							<img
								src={UnFavorited}
								alt="Unfavorite Concert"
								className="h-100% w-100% object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
							/>
						</button>
					</div>
				)}
			</div>
			{currentUser.is_staff === true ? (
				<div>
					<button
						className="bg-slate-300 hover:cursor-pointer hover:bg-slate-400 duration-300 py-2 px-4 font-medium rounded-lg border-2 border-slate-600"
						type="button"
						onClick={() => navigate(`/${concertId}/edit`)}>
						Edit Concert
					</button>
				</div>
			) : (
				""
			)}
		</section>
	)
}

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatFullDateTime } from "../../utils/FormatDateTime"
import { getAllFavorites } from "../../managers/FavoritesManager"

export const FavoriteConcerts = () => {
	const [allFavorites, setAllFavorites] = useState([])
	const navigate = useNavigate()

	const fetchAndSetAllFavorites = () => {
		getAllFavorites().then((concertsArray) => setAllFavorites(concertsArray))
	}

	useEffect(() => {
		fetchAndSetAllFavorites()
	}, [])

	return (
		<div className="py-3">
			<h2
				className="bg-zinc-400 bg-opacity-80 m-auto max-w-min
     rounded-md text-center text-3xl font-sans underline font-extrabold">
				My Favorites
			</h2>
			<article className="">
				{allFavorites.map((favorite) => {
					return (
						<section
							key={favorite.id}
							className="flex justify-between p-5 mx-8 my-5 border-4 scale-100
                    bg-green-100 bg-opacity-90 border-green-500 rounded-xl
                    hover:scale-110 transition-transform duration-300"
							onClick={() => {
								navigate(`/${favorite.concert.id}`)
							}}>
							<div className="pt-1.5">{favorite.concert.band.name}</div>
							<div className="pt-2">{favorite.concert.venue.name}</div>
							<div className="pt-2">
								{formatFullDateTime(favorite.concert.show_starts)}
							</div>
							<div className=""></div>
						</section>
					)
				})}
			</article>
		</div>
	)
}

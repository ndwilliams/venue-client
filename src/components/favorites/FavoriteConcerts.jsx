import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { formatFullDateTime } from "../../utils/FormatDateTime"
import { getCurrentUserFavorites } from "../../managers/FavoritesManager"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FilterConcertsByVenue } from "../concerts/FilterConcertsByVenue"
import { getAllVenues } from "../../managers/VenueManager"

export const FavoriteConcerts = () => {
	const [allFavorites, setAllFavorites] = useState([])
	const [filteredFavorites, setFilteredFavorites] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedVenue, setSelectedVenue] = useState(null)
	const [allVenues, setAllVenues] = useState([])
	const navigate = useNavigate()

	const fetchAndSetCurrentUserFavorites = () => {
		getCurrentUserFavorites().then((concertsArray) =>
			setAllFavorites(concertsArray)
		)
	}

	const fetchAndSetAllVenues = () => {
		getAllVenues().then((venuesArray) => setAllVenues(venuesArray))
	}

	useEffect(() => {
		fetchAndSetCurrentUserFavorites()
		fetchAndSetAllVenues()
	}, [])

	useEffect(() => {
		if (parseInt(selectedVenue) && selectedDate) {
			const reactDate = new Date(selectedDate)
			const filteredConcerts = allFavorites.filter(
				(favorite) =>
					favorite.concert.venue.id === parseInt(selectedVenue) &&
					reactDate.getFullYear() ===
						new Date(favorite.concert.show_starts).getFullYear() &&
					reactDate.getMonth() ===
						new Date(favorite.concert.show_starts).getMonth() &&
					reactDate.getDate() ===
						new Date(favorite.concert.show_starts).getDate()
			)
			setFilteredFavorites(filteredConcerts)
		} else if (parseInt(selectedVenue)) {
			const filteredConcerts = allFavorites.filter(
				(favorite) => favorite.concert.venue.id === parseInt(selectedVenue)
			)
			setFilteredFavorites(filteredConcerts)
		} else if (selectedDate) {
			const reactDate = new Date(selectedDate)
			const filteredConcerts = allFavorites.filter(
				(favorite) =>
					reactDate.getFullYear() ===
						new Date(favorite.concert.show_starts).getFullYear() &&
					reactDate.getMonth() ===
						new Date(favorite.concert.show_starts).getMonth() &&
					reactDate.getDate() ===
						new Date(favorite.concert.show_starts).getDate()
			)
			setFilteredFavorites(filteredConcerts)
		} else {
			setFilteredFavorites(allFavorites)
		}
	}, [selectedVenue, selectedDate, allFavorites])

	return (
		<div className="favorites-container">
			<div className="headers-container flex justify-around items-center px-5">
				<div className="px-1">
					<DatePicker
						className="bg-slate-200  py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-slate-300 duration-200 delay-50"
						onChange={(date) => setSelectedDate(date)}
						selected={selectedDate}
						dateFormat="dd/MM/yyyy"
						placeholderText="Select Date"
					/>
					<button
						onClick={() => setSelectedDate(null)}
						className="bg-slate-200 outline-1 text-lg px-5 py-1 border-black border-2 rounded-lg transition-color hover:bg-slate-300 duration-200 delay-50">
						Reset Date Filter
					</button>
				</div>
				<FilterConcertsByVenue
					setSelectedVenue={setSelectedVenue}
					allVenues={allVenues}
				/>
			</div>
			<div className="py-3">
				<article className="">
					{filteredFavorites.map((favorite) => {
						return (
							<section
								key={favorite.id}
								className="flex justify-between items-center p-5 mx-4 my-3 border-4 scale-[.80]
								bg-amber-500 bg-opacity-90 border-amber-600 rounded-xl
								hover:scale-[.90] hover:cursor-pointer transition-transform duration-500 text-center text-xl font-semibold"
								onClick={() => {
									navigate(`/${favorite.concert.id}`)
								}}>
								<div className="">{favorite.concert.band.name}</div>
								<div className="">{favorite.concert.venue.name}</div>
								<div className="">
									{formatFullDateTime(favorite.concert.show_starts)}
								</div>
							</section>
						)
					})}
				</article>
			</div>
		</div>
	)
}

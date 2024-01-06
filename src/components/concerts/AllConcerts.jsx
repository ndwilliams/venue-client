import { useEffect, useState } from "react"
import { getAllConcerts } from "../../managers/ConcertManager"
import { useNavigate } from "react-router-dom"
import { formatFullDateTime } from "../../utils/FormatDateTime"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getAllVenues } from "../../managers/VenueManager"
import { FilterConcertsByVenue } from "./FilterConcertsByVenue"

export const AllConcerts = ({ currentUser }) => {
	const [allConcerts, setAllConcerts] = useState([])
	const [filteredConcerts, setFilteredConcerts] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [venueSelection, setVenueSelection] = useState([])
	const [allVenues, setAllVenues] = useState([])
	const navigate = useNavigate()

	const fetchAndSetAllConcerts = () => {
		getAllConcerts().then((concertArray) => setAllConcerts(concertArray))
	}

	const fetchAndSetAllVenues = () => {
		getAllVenues().then((venuesArray) => setAllVenues(venuesArray))
	}

	useEffect(() => {
		fetchAndSetAllConcerts()
		fetchAndSetAllVenues()
	}, [])

	useEffect(() => {
		if (venueSelection > 0) {
			const concertsAtVenue = allConcerts.filter(
				(concert) => concert.venue.id === parseInt(venueSelection)
			)
			setFilteredConcerts(concertsAtVenue)
		} else {
			setFilteredConcerts(allConcerts)
		}
	}, [allConcerts, venueSelection])

	useEffect(() => {
		if (selectedDate) {
			const reactDate = new Date(selectedDate)
			const filteredConcertsByDate = allConcerts.filter(
				(concert) =>
					reactDate.getFullYear() ===
						new Date(concert.show_starts).getFullYear() &&
					reactDate.getMonth() === new Date(concert.show_starts).getMonth() &&
					reactDate.getDate() === new Date(concert.show_starts).getDate()
			)
			setFilteredConcerts(filteredConcertsByDate)
		} else {
			setFilteredConcerts(allConcerts)
		}
	}, [allConcerts, selectedDate])

	return (
		<div className="py-3">
			<h2
				className="bg-zinc-400 bg-opacity-80 m-auto max-w-min
             rounded-md text-center text-3xl font-sans underline font-extrabold">
				All Concerts
			</h2>
			<div className="p-1 min-w-full bg-slate-500">
				<DatePicker
					onChange={(date) => setSelectedDate(date)}
					selected={selectedDate}
					dateFormat="dd/MM/yyyy"
				/>
				<button onClick={() => setSelectedDate(null)}>Reset Filters</button>
			</div>
			<FilterConcertsByVenue
				setVenueSelection={setVenueSelection}
				allVenues={allVenues}
			/>
			{currentUser.is_staff === true ? (
				<div
					className="add-concert-button"
					onClick={() => {
						navigate(`/addConcert`)
					}}>
					Add Concert
				</div>
			) : (
				""
			)}

			<article className="">
				{filteredConcerts.map((concert) => {
					return (
						<section
							key={concert.id}
							className="flex justify-between p-5 mx-8 my-5 border-4 scale-100
                            bg-green-100 bg-opacity-90 border-green-500 rounded-xl
                            hover:scale-110 transition-transform duration-300"
							onClick={() => {
								navigate(`/${concert.id}`)
							}}>
							<div className="pt-1.5">{concert.band.name}</div>
							<div className="pt-2">{concert.venue.name}</div>
							<div className="pt-2">
								{formatFullDateTime(concert.show_starts)}
							</div>
							<div className=""></div>
						</section>
					)
				})}
			</article>
		</div>
	)
}

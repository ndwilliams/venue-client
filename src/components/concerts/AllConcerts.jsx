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
	const [selectedVenue, setSelectedVenue] = useState(null)
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
		if (parseInt(selectedVenue) && selectedDate) {
			const reactDate = new Date(selectedDate)
			const filteredConcerts = allConcerts.filter(
				(concert) =>
					concert.venue.id === parseInt(selectedVenue) &&
					reactDate.getFullYear() ===
						new Date(concert.show_starts).getFullYear() &&
					reactDate.getMonth() === new Date(concert.show_starts).getMonth() &&
					reactDate.getDate() === new Date(concert.show_starts).getDate()
			)
			setFilteredConcerts(filteredConcerts)
		} else if (parseInt(selectedVenue)) {
			const filteredConcerts = allConcerts.filter(
				(concert) => concert.venue.id === parseInt(selectedVenue)
			)
			setFilteredConcerts(filteredConcerts)
		} else if (selectedDate) {
			const reactDate = new Date(selectedDate)
			const filteredConcerts = allConcerts.filter(
				(concert) =>
					reactDate.getFullYear() ===
						new Date(concert.show_starts).getFullYear() &&
					reactDate.getMonth() === new Date(concert.show_starts).getMonth() &&
					reactDate.getDate() === new Date(concert.show_starts).getDate()
			)
			setFilteredConcerts(filteredConcerts)
		} else {
			setFilteredConcerts(allConcerts)
		}
	}, [allConcerts, selectedVenue, selectedDate])

	return (
		<div className="all-concerts-container">
			<div className="headers-container flex justify-around items-center">
				<div className="date-picker-and-filter-reset-container flex justify-around items-center px-5">
					<div className="date-picker px-3">
						<DatePicker
							className="date-picker bg-amber-600  py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
							placeholderText="Select Date"
							onChange={(date) => setSelectedDate(date)}
							selected={selectedDate}
							dateFormat="dd/MM/yyyy"
						/>
					</div>
					<button
						className="date-filter-reset-button bg-amber-600 outline-1 text-lg px-5 py-1 border-black border-2 rounded-lg transition-color hover:bg-amber-400 duration-200 delay-50"
						onClick={() => setSelectedDate(null)}>
						Reset Date Filter
					</button>
				</div>

				{currentUser.is_staff === true ? (
					<div className="add-concert-container">
						<button
							className="add-concert-button bg-amber-600 outline-1 text-lg px-3 py-1 border-black border-2 rounded-lg transition-color hover:bg-amber-400 duration-200 delay-50"
							onClick={() => {
								navigate(`/addConcert`)
							}}>
							Add Concert
						</button>
					</div>
				) : (
					""
				)}
				<div className="venue-filter-container">
					<FilterConcertsByVenue
						setSelectedVenue={setSelectedVenue}
						allVenues={allVenues}
					/>
				</div>
			</div>

			<article className="max-w-2/3">
				{filteredConcerts.map((concert) => {
					return (
						<section
							key={concert.id}
							className="flex justify-around p-5 mx-4 my-3 border-4 scale-[.80]
                            bg-amber-500 bg-opacity-90 border-amber-600 rounded-xl
                            hover:scale-[.90] hover:cursor-pointer transition-transform duration-500 text-center text-xl font-semibold"
							onClick={() => {
								navigate(`/${concert.id}`)
							}}>
							<div className="">{concert.band.name}</div>
							<div className="">{concert.venue.name}</div>
							<div className="">{formatFullDateTime(concert.show_starts)}</div>
						</section>
					)
				})}
			</article>
		</div>
	)
}

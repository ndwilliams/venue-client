import { useEffect, useState } from "react"
import { getAllBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers"

export const AddConcertForm = () => {
	const [bands, setBands] = useState([])
	const [venues, setVenues] = useState([])
	const [doorsOpen, setDoorsOpen] = useState(null)
	const [concertStartTime, setConcertStartTime] = useState(null)
	const [newConcert, setNewConcert] = useState({
		band: 0,
		venue: 0,
		doors_open: "",
		show_starts: "",
		active: true,
	})

	// console.log(doorsOpen.$d)
	// const time = doorsOpen.$d.toISOString()
	// console.log(time)

	const fetchAndSetBands = () => {
		getAllBands().then((bandsArray) => {
			setBands(bandsArray)
		})
	}

	const fetchAndSetAllVenues = () => {
		getAllVenues().then((venuesArray) => {
			setVenues(venuesArray)
		})
	}

	useEffect(() => {
		fetchAndSetBands()
		fetchAndSetAllVenues()
	}, [])

	const handleInputChange = (e) => {
		const concertCopy = { ...newConcert }
		concertCopy[e.target.name] = e.target.value
		setNewConcert(concertCopy)
	}

	const handleSelectInputChange = (e) => {
		const concertCopy = { ...newConcert }
		concertCopy[e.target.name] = parseInt(e.target.value)
		setNewConcert(concertCopy)
	}

	return (
		<div className="add-concert-container">
			<h2 className="add-concert-header">Add Concert</h2>
			<div className="doors-open-picker bg-slate-500">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateTimePicker"]}>
						<DateTimePicker
							label="Doors Open"
							selected={doorsOpen}
							onChange={setDoorsOpen}
							views={["year", "month", "day", "hours", "minutes"]}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
							}}
							timeIntervals={15}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<div className="doors-open-picker bg-slate-500">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateTimePicker"]}>
						<DateTimePicker
							label="Concert Starts"
							selected={concertStartTime}
							onChange={setConcertStartTime}
							views={["year", "month", "day", "hours", "minutes"]}
							viewRenderers={{
								hours: renderTimeViewClock,
								minutes: renderTimeViewClock,
							}}
							timeIntervals={15}
						/>
					</DemoContainer>
				</LocalizationProvider>
			</div>
			<form className="add-concert-form">
				<div className="headling-band">Headliner</div>
				<select
					name="Headliner"
					value={bands.id}
					onChange={handleSelectInputChange}
					className="add-concert-input">
					<option value={0}>Please select a headliner</option>
					{bands.map((bandObj) => {
						return (
							<option key={bandObj.id} value={bandObj.id}>
								{bandObj.name}
							</option>
						)
					})}
				</select>
				<div className="venue">Venue</div>
				<select
					name="Venue"
					value={venues.id}
					onChange={handleSelectInputChange}
					className="add-concert-input">
					<option value={0}>Please select a venue</option>
					{venues.map((venueObj) => {
						return (
							<option key={venueObj.id} value={venueObj.id}>
								{venueObj.name}
							</option>
						)
					})}
				</select>
			</form>
		</div>
	)
}

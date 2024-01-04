import { useEffect, useRef, useState } from "react"
import { getAllBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers"
import { useNavigate } from "react-router-dom"

export const AddConcertForm = () => {
	const [bands, setBands] = useState([])
	const [venues, setVenues] = useState([])
	const [doorsOpen, setDoorsOpen] = useState(null)
	const [showStarts, setShowStarts] = useState(null)
	const [openers, changeOpeners] = useState([
		{ id: 1, name: "The Rolling Stones", genre: "Rock & Roll" },
		{ id: 2, name: "Jay-Z", genre: "Rap/Hip-Hop" },
	])
	const [chosenOpeners, updateChosenOpeners] = useState(new Set())
	const [newConcert, setNewConcert] = useState({
		band: 0,
		venue: 0,
		doors_open: "time",
		show_starts: "time",
		active: true,
	})
	const [newBand, setNewBand] = useState({
		name: "",
		genre: "",
	})
	const addBand = useRef()
	const navigate = useNavigate()

	const fetchAndSetBands = () => {
		getAllBands().then((bandsArray) => {
			setBands(bandsArray)
			changeOpeners(bandsArray)
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

	const addConcert = async () => {
		const response = await fetch(`http://localhost:8000/concerts`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("auth_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...newConcert,
				openers: Array.from(chosenOpeners),
				doors_open: doorsOpen.$d.toISOString(),
				show_starts: showStarts.$d.toISOString(),
			}),
		})
		return response
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (Object.values(newConcert).every(Boolean) && doorsOpen && showStarts) {
			await addConcert()
			navigate(`/`)
		} else {
			window.alert("Please Fill Out All The Necessary Fields")
		}
	}

	const handleSelectInputChange = (e) => {
		const concertCopy = { ...newConcert }
		concertCopy[e.target.name] = parseInt(e.target.value)
		setNewConcert(concertCopy)
	}

	const handleOpenerChosen = (opener) => {
		const openersCopy = new Set(chosenOpeners)
		openersCopy.has(opener.id)
			? openersCopy.delete(opener.id)
			: openersCopy.add(opener.id)
		updateChosenOpeners(openersCopy)
	}

	const handleBandInputChange = (event) => {
		const bandCopy = { ...newBand }
		bandCopy[event.target.name] = event.target.value
		setNewBand(bandCopy)
	}

	const postNewBand = async (newBand) => {
		const response = await fetch(`http://localhost:8000/bands`, {
			method: "POST",
			headers: {
				Authorization: `Token ${localStorage.getItem("auth_token")}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBand),
		})
		return response
	}

	const handleSubmitNewBand = async (event) => {
		event.preventDefault()
		await postNewBand(newBand)
		addBand.current.close()
		fetchAndSetBands()
		setNewBand({ name: "", band: "" })
	}

	return (
		<div className="add-concert-container">
			<dialog className="manage-add-bands" ref={addBand}>
				<div className="add-band-modal">
					<fieldset>
						<input
							type="text"
							name="name"
							value={newBand.name}
							placeholder="Band Name"
							className="input-text"
							onChange={handleBandInputChange}
							required
						/>
					</fieldset>
					<fieldset>
						<input
							type="text"
							value={newBand.genre}
							name="genre"
							placeholder="Genre"
							className="input-text"
							onChange={handleBandInputChange}
							required
						/>
					</fieldset>
				</div>
				<div>
					<button className="save-button" onClick={handleSubmitNewBand}>
						Add Band
					</button>
					<button
						className="exit-button"
						onClick={() => {
							addBand.current.close()
							setNewBand({ name: "", genre: "" })
						}}>
						Cancel
					</button>
				</div>
			</dialog>
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
							selected={showStarts}
							onChange={setShowStarts}
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
			<form name="add-concert" className="add-concert-form">
				<div className="headling-band">Headliner</div>
				<select
					name="band"
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
				<div>
					<button
						type="button"
						className="add-new-band"
						onClick={() => {
							addBand.current.showModal()
						}}>
						{`Don't See The Band You're Looking For? Add it Here!`}
					</button>
				</div>
				<div className="venue">Venue</div>
				<select
					name="venue"
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
				<fieldset>
					<label>
						{" "}
						<strong>Openers</strong>
					</label>
					<br />
					{openers.map((band) => (
						<div key={`band-${band.id}`}>
							<input
								type="checkbox"
								checked={chosenOpeners.has(band.id)}
								onChange={() => handleOpenerChosen(band)}
							/>
							{band.name}
						</div>
					))}
				</fieldset>
				<fieldset>
					<button type="submit" onClick={handleSubmit}>
						Submit Concert
					</button>
				</fieldset>
			</form>
		</div>
	)
}

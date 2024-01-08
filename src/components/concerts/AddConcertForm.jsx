import { useEffect, useRef, useState } from "react"
import { addNewBand, getAllBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers"
import { useNavigate } from "react-router-dom"
import { addConcert } from "../../managers/ConcertManager"

export const AddConcertForm = () => {
	const [bands, setBands] = useState([])
	const [venues, setVenues] = useState([])
	const [doorsOpen, setDoorsOpen] = useState(null)
	const [showStarts, setShowStarts] = useState(null)
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

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (Object.values(newConcert).every(Boolean) && doorsOpen && showStarts) {
			const concertObject = JSON.stringify({
				...newConcert,
				opening_bands: Array.from(chosenOpeners),
				doors_open: doorsOpen.$d.toISOString(),
				show_starts: showStarts.$d.toISOString(),
			})
			await addConcert(concertObject)
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

	const handleSubmitNewBand = async (event) => {
		event.preventDefault()
		await addNewBand(newBand)
		setNewBand({ name: "", genre: "" })
		addBand.current.close()
		fetchAndSetBands()
	}

	return (
		<div className="add-concert-container bg-slate-400 mx-auto content-center text-center w-1/2">
			<dialog
				className="manage-add-bands rounded-2xl w-1/5 bg-slate-300 shadow-xl"
				ref={addBand}>
				<div className="add-band-modal px-4 py-4">
					<fieldset className="my-4">
						<input
							type="text"
							name="name"
							value={newBand.name}
							placeholder="Band Name"
							className="input-text bg-amber-600 px-4 py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
							onChange={handleBandInputChange}
							required
						/>
					</fieldset>
					<fieldset className="my-4">
						<input
							type="text"
							value={newBand.genre}
							name="genre"
							placeholder="Genre"
							className="input-text bg-amber-600 py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50 w-max"
							onChange={handleBandInputChange}
							required
						/>
					</fieldset>

					<div>
						<button
							onClick={handleSubmitNewBand}
							className="save-button px-1 py-0.5 mx-2 my-1 bg-green-500 border-black border-2 rounded-lg transition-color hover:bg-green-400 duration-200 delay-75">
							Add Band
						</button>
						<button
							className="exit-button px-1 py-0.5 mx-2 my-1 bg-red-500 border-black border-2 rounded-lg transition-color hover:bg-red-400 duration-200 delay-75"
							onClick={() => {
								addBand.current.close()
								setNewBand({ name: "", genre: "" })
							}}>
							Cancel
						</button>
					</div>
				</div>
			</dialog>
			<h2 className="add-concert-header text-3xl font-semibold py-3">
				Add Concert
			</h2>
			<div className="time-pickers-container flex justify-around my-3">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateTimePicker"]}>
						<DateTimePicker
							className=" bg-amber-600 py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
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

				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateTimePicker"]}>
						<DateTimePicker
							className="bg-amber-600 py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
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
				<fieldset className="headliner-fieldset my-1">
					<div className="headling-band text-2xl py-2">Headliner</div>
					<select
						name="band"
						value={newConcert.band}
						onChange={handleSelectInputChange}
						className="add-concert-input py-2 my-1 bg-amber-600 text-xl placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						<option value={0}>Select a Headliner</option>
						{bands.map((bandObj) => {
							return (
								<option key={bandObj.id} value={bandObj.id}>
									{bandObj.name}
								</option>
							)
						})}
					</select>
					<div className="add-band-button">
						<button
							type="button"
							className="add-new-band bg-amber-600 py-1 px-4 text-md placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
							onClick={() => {
								addBand.current.showModal()
							}}>
							{`Don't See The Band You're Looking For? Add it Here!`}
						</button>
					</div>
				</fieldset>
				<fieldset className="venue my-2">
					<h2 className="venue-selection-title text-2xl py-2">Venue</h2>
					<select
						name="venue"
						value={newConcert.venue}
						onChange={handleSelectInputChange}
						className="add-concert-input py-2 bg-amber-600 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						<option value={0}>Select a Venue</option>
						{venues.map((venueObj) => {
							return (
								<option key={venueObj.id} value={venueObj.id}>
									{venueObj.name}
								</option>
							)
						})}
					</select>
				</fieldset>
				<fieldset className="openers-fieldset my-2">
					<label>
						{" "}
						<h2 className="openers-title text-2xl my-1">Openers</h2>
					</label>
					<div className="openers-container flex justify-evenly flex-wrap">
						{bands.map((band) => (
							<div
								key={`band-${band.id}`}
								className="my-1 px-3 py-1 border border-amber-400 rounded dark:border-gray-700">
								<label htmlFor="checkbox">{band.name}</label>
								<input
									id="checkbox"
									className="mx-0.5 w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
									type="checkbox"
									checked={chosenOpeners.has(band.id)}
									onChange={() => handleOpenerChosen(band)}
								/>
							</div>
						))}
					</div>
				</fieldset>
				<fieldset className="submit-button-fieldset my-3 py-4">
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-amber-600 py-1 px-2 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						Submit Concert
					</button>
				</fieldset>
			</form>
		</div>
	)
}

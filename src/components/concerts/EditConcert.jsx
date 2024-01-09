import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { addNewBand, getAllBands } from "../../managers/BandManager"
import { getAllVenues } from "../../managers/VenueManager"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { editConcert, getConcertById } from "../../managers/ConcertManager"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers"
import dayjs from "dayjs"

export const EditConcert = () => {
	const { concertId } = useParams()
	const navigate = useNavigate()

	const [editedConcert, setEditedConcert] = useState({})
	const [bands, setBands] = useState([])
	const [venues, setVenues] = useState([])
	const [chosenOpeners, updateChosenOpeners] = useState(new Set())
	const [openers, changeOpeners] = useState([
		{ id: 1, name: "The Rolling Stones", genre: "Rock & Roll" },
		{ id: 2, name: "Jay-Z", genre: "Rap/Hip-Hop" },
	])
	const [newBand, setNewBand] = useState({
		name: "",
		genre: "",
	})
	const addBand = useRef()

	const fetchAndSetConcert = () => {
		getConcertById(concertId).then((concertObj) =>
			setEditedConcert({
				id: concertObj.id,
				venue: concertObj.venue.id,
				band: concertObj.band.id,
				active: concertObj.active,
				opening_bands: concertObj.opening_bands,
				show_starts: concertObj.show_starts,
				doors_open: concertObj.doors_open,
			})
		)
	}

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
		fetchAndSetConcert()
		fetchAndSetAllVenues()
		fetchAndSetBands()
	}, [])

	useEffect(() => {
		const openersCopy = new Set(
			editedConcert.opening_bands?.map((band) => band.id)
		)
		updateChosenOpeners(openersCopy)
	}, [editedConcert])

	const handleSelectInputChange = (e) => {
		const concertCopy = { ...editedConcert }
		concertCopy[e.target.name] = parseInt(e.target.value)
		setEditedConcert(concertCopy)
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
		addBand.current.close()
		fetchAndSetBands()
		setNewBand({ name: "", band: "" })
	}

	const isNonEmpty = (value) => {
		return value !== undefined && value !== null && value !== ""
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const isEveryValueTruthy = Object.values(editedConcert).every(isNonEmpty)
		if (isEveryValueTruthy) {
			const concertCopy = {
				...editedConcert,
				opening_bands: Array.from(chosenOpeners),
			}
			await editConcert(concertCopy)
			alert("Concert Successfully Edited!")
			navigate(`/${concertId}`)
		} else {
			window.alert("Please Fill Out All The Necessary Fields")
		}
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
			<h2 className="edit-concert-header text-3xl font-semibold py-3">
				Edit Concert
			</h2>
			<div className="doors-open-picker flex justify-around my-3">
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={["DateTimePicker"]}>
						<DateTimePicker
							className="bg-amber-600 py-1 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
							label="Doors Open"
							value={dayjs(editedConcert.doors_open)}
							onChange={(time) => {
								const newTime = time.$d.toISOString()
								setEditedConcert({ ...editedConcert, ["doors_open"]: newTime })
							}}
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
							value={dayjs(editedConcert.show_starts)}
							onChange={(time) => {
								const newTime = time.$d.toISOString()
								setEditedConcert({ ...editedConcert, ["show_starts"]: newTime })
							}}
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
			<form name="edit-concert" className="edit-concert-form">
				<fieldset className="headlinger-fieldset">
					<div className="headliner-title text-2xl py-2">Headliner</div>
					<select
						name="band"
						value={editedConcert.band}
						onChange={handleSelectInputChange}
						className="edit-concert-input add-concert-input py-2 my-1 bg-amber-600 text-xl placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						<option value={0}>Select A Headliner</option>
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
							className="add-new-band add-new-band bg-amber-400 py-1 px-4 text-md placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-300 duration-200 delay-50"
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
						value={editedConcert.venue}
						onChange={handleSelectInputChange}
						className="edit-concert-input add-concert-input py-2 bg-amber-600 text-lg placeholder:text-center placeholder:text-gray-600 rounded-lg hover:cursor-pointer placeholder:italic placeholder:text-bold text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						<option value={0}>Please select a venue</option>
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
						{openers.map((band) => (
							<div key={`band-${band.id}`} className="">
								<input
									id="checkbox"
									type="checkbox"
									className="mx-0.5 w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 hover:cursor-pointer"
									checked={chosenOpeners.has(band.id)}
									onChange={() => handleOpenerChosen(band)}
								/>
								{band.name}
							</div>
						))}
					</div>
				</fieldset>

				<fieldset>
					{editedConcert.active ? (
						<div>
							<button
								type="button"
								className="hide-concert-button px-1 py-0.5 mx-2 my-1 bg-red-500 border-black border-2 rounded-lg transition-color hover:bg-red-400 duration-200 delay-75"
								onClick={async () => {
									if (
										window.confirm(
											"Are you sure you wish to hide this concert?"
										)
									) {
										await setEditedConcert({ ...editedConcert, active: false })
										editConcert(editedConcert)
									}
								}}>
								Hide Concert?
							</button>
						</div>
					) : (
						<div>
							<button
								type="button"
								className="activate-concert-button px-1 py-0.5 mx-2 my-1 bg-green-500 border-black border-2 rounded-lg transition-color hover:bg-green-400 duration-200 delay-75"
								onClick={async () => {
									if (
										window.confirm(
											"Are you sure you wish to activate this concert?"
										)
									) {
										await setEditedConcert({ ...editedConcert, active: true })
										editConcert(editedConcert)
									}
								}}>
								Activate Concert?
							</button>
						</div>
					)}
				</fieldset>
				<fieldset className="submit-button-fieldset my-3 py-4">
					<button
						type="submit"
						onClick={handleSubmit}
						className="bg-amber-600 py-1 px-2 text-lg text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
						Submit Concert
					</button>
				</fieldset>
			</form>
		</div>
	)
}

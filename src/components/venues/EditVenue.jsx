import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editVenue, getVenueById } from "../../managers/VenueManager"

export const EditVenue = () => {
	const { venueId } = useParams()
	const navigate = useNavigate()

	const [venue, setVenue] = useState({})

	useEffect(() => {
		getVenueById(venueId).then((venueObj) => setVenue(venueObj))
	}, [venueId])

	const handleInputChange = (event) => {
		const venueCopy = { ...venue }
		venueCopy[event.target.name] = event.target.value
		setVenue(venueCopy)
	}

	const isNonEmpty = (value) => {
		return value !== undefined && value !== null && value !== ""
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const isEveryValueTruthy = Object.values(venue).every(isNonEmpty)
		if (isEveryValueTruthy) {
			alert("Venue Successfully Edited!")
			await editVenue(venue)
			navigate(`/venues/${venueId}`)
		} else {
			window.alert("Please Fill Out All The Necessary Fields")
		}
	}

	return (
		<div className="bg-blue-400 mx-auto content-center text-center w-1/2 opacity-90 my-10 rounded-2xl border-black border-4 shadow-xl">
			<form className="edit-venue-form py-4 my-4">
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Name:</label>
					<input
						name="name"
						value={venue.name ? venue.name : ""}
						type="text"
						className="venue-name-input text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Name"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Address:</label>
					<input
						name="address"
						value={venue.address ? venue.address : ""}
						type="text"
						className="venue-address-input w-[400px] text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Address"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Outside Image URL:</label>
					<input
						name="venue_outside_image_url"
						value={
							venue.venue_outside_image_url ? venue.venue_outside_image_url : ""
						}
						type="url"
						className="venue-outside-image-input w-[500px] text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Outside Image URL"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg ">Inside Image URL:</label>
					<input
						name="venue_inside_image_url"
						value={
							venue.venue_inside_image_url ? venue.venue_inside_image_url : ""
						}
						type="url"
						className="venue-inside-image-input w-[500px] text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Inside Image URL"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Max Capacity:</label>
					<input
						name="capacity"
						value={venue.capacity ? venue.capacity : ""}
						className="venue-max-capacity text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Max Capacity"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3 relative">
					<label className="mx-2 absolute text-lg top-0 left-0 right-0 text-center">
						About Section:
					</label>
					<textarea
						name="about_section"
						value={venue.about_section ? venue.about_section : ""}
						className="venue-about-section mt-8 text-center w-[600px] h-[300px] bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						type="textarea"
						placeholder="About Section"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					{venue.active ? (
						<div>
							<button
								type="button"
								className="hide-venue-button px-1 py-0.5 mx-2 my-1
								bg-red-500 border-black border-2 rounded-lg 
								transition-color hover:bg-red-400 duration-200 delay-75"
								onClick={() => {
									if (
										window.confirm("Are you sure you wish to hide this venue?")
									) {
										setVenue({ ...venue, active: false })
										editVenue(venue)
									}
								}}>
								Hide Venue
							</button>
						</div>
					) : (
						<div>
							<button
								type="button"
								className="unhide-venue-button px-1 py-0.5 mx-2 my-1
								bg-green-500 border-black border-2 rounded-lg 
								transition-color hover:bg-green-400 duration-200 delay-75"
								onClick={() => {
									if (
										window.confirm(
											"Are you sure you wish to activate this venue?"
										)
									) {
										setVenue({ ...venue, active: true })
										editVenue(venue)
									}
								}}>
								Activate Venue
							</button>
						</div>
					)}
				</fieldset>

				<button
					type="submit"
					onClick={handleSubmit}
					className="bg-amber-600 py-1 px-2 text-lg placeholder:text-center
					placeholder:text-gray-600 rounded-lg hover:cursor-pointer 
					text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50">
					Update Venue
				</button>
			</form>
		</div>
	)
}

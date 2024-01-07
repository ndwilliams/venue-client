import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editVenue, getVenueById } from "../../managers/VenueManager"

export const EditVenue = ({ currentUser }) => {
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

	const handleSubmit = async (event, venue) => {
		event.preventDefault()
		const isEveryValueTruthy = Object.values(venue).every(isNonEmpty)
		if (isEveryValueTruthy) {
			alert("Venue Successfully Edited!")
			await editVenue(currentUser, venue)
			navigate(`/venues/${venueId}`)
		} else {
			window.alert("Please Fill Out All The Necessary Fields")
		}
	}

	return (
		<form className="edit-venue-form">
			<fieldset className="edit-venue-fieldset">
				<label>Name:</label>
				<input
					name="name"
					value={venue.name ? venue.name : ""}
					type="text"
					className="venue-name-input"
					placeholder="Venue Name"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>Address:</label>
				<input
					name="address"
					value={venue.address ? venue.address : ""}
					type="text"
					className="venue-address-input"
					placeholder="Venue Address"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>Outside Image URL:</label>
				<input
					name="venue_outside_image_url"
					value={
						venue.venue_outside_image_url ? venue.venue_outside_image_url : ""
					}
					type="url"
					className="venue-outside-image-input"
					placeholder="Venue Outside Image URL"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>Inside Image URL:</label>
				<input
					name="venue_inside_image_url"
					value={
						venue.venue_inside_image_url ? venue.venue_inside_image_url : ""
					}
					type="url"
					className="venue-inside-image-input"
					placeholder="Venue Inside Image URL"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>Max Capacity:</label>
				<input
					name="capacity"
					value={venue.capacity ? venue.capacity : ""}
					className="venue-max-capacity"
					placeholder="Max Capacity"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>About Section</label>
				<textarea
					name="about_section"
					value={venue.about_section ? venue.about_section : ""}
					className="venue-about-section"
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
							className="hide-venue-button"
							onClick={() => {
								if (
									window.confirm("Are you sure you wish to hide this venue?")
								) {
									setVenue({ ...venue, active: false })
									handleSubmit()
								}
							}}>
							Hide Venue
						</button>
					</div>
				) : (
					<div>
						<button
							type="button"
							className="unhide-venue-button"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you wish to activate this venue?"
									)
								) {
									setVenue({ ...venue, active: true })
									handleSubmit()
								}
							}}>
							Activate Venue
						</button>
					</div>
				)}
			</fieldset>

			<button type="submit" onClick={handleSubmit}>
				Update Venue
			</button>
		</form>
	)
}

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVenueById } from "../../managers/VenueManager"

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

	const handleSubmit = async (event) => {
		event.preventDefault()

		const response = await fetch(
			`http://localhost:8000/venues/${parseInt(venueId)}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Token ${localStorage.getItem("auth_token")}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(venue),
			}
		)
		navigate(`/venues/${venueId}`)
		return response
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
			<button type="submit" onClick={handleSubmit}>
				Update Venue
			</button>
		</form>
	)
}

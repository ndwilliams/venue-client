import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addVenue } from "../../managers/VenueManager"

export const AddVenue = () => {
	const [newVenue, setNewVenue] = useState({
		name: "",
		address: "",
		venue_outside_image_url: "",
		venue_inside_image_url: "",
		capacity: "",
		about_section: "",
		active: true,
	})
	const navigate = useNavigate()

	const handleInputChange = (event) => {
		const venueCopy = { ...newVenue }
		venueCopy[event.target.name] = event.target.value
		setNewVenue(venueCopy)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (Object.values(newVenue).every(Boolean)) {
			alert("Venue Successfully Added!")
			await addVenue(newVenue)
			navigate(`/venues`)
		} else {
			alert("Please Fill Out All The Necessary Fields")
		}
	}

	return (
		<form className="edit-venue-form">
			<fieldset className="edit-venue-fieldset">
				<label>Name:</label>
				<input
					name="name"
					value={newVenue.name}
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
					value={newVenue.address}
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
					value={newVenue.venue_outside_image_url}
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
					value={newVenue.venue_inside_image_url}
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
					value={newVenue.capacity}
					className="venue-max-capacity"
					placeholder="Max Capacity"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset className="edit-venue-fieldset">
				<label>About Section</label>
				<textarea
					name="about_section"
					value={newVenue.about_section}
					className="venue-about-section"
					type="textarea"
					placeholder="About Section"
					onChange={handleInputChange}
				/>
			</fieldset>
			<fieldset>
				<button
					type="submit"
					className="venue-submit-button"
					onClick={handleSubmit}>
					Add Venue
				</button>
			</fieldset>
		</form>
	)
}

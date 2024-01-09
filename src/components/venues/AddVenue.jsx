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
		<div className="bg-blue-400 mx-auto content-center text-center w-1/2 opacity-90 my-10 rounded-2xl border-black border-4 shadow-xl">
			<form className="edit-venue-form py-4 my-4">
				<fieldset className="edit-venue-fieldset mx-2 text-lg">
					<label className="mx-2 text-lg">Name:</label>
					<input
						name="name"
						value={newVenue.name}
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
						value={newVenue.address}
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
						value={newVenue.venue_outside_image_url}
						type="url"
						className="venue-outside-image-input w-[490px] text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Outside Image URL"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Inside Image URL:</label>
					<input
						name="venue_inside_image_url"
						value={newVenue.venue_inside_image_url}
						type="url"
						className="venue-inside-image-input w-[475px] text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Venue Inside Image URL"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3">
					<label className="mx-2 text-lg">Max Capacity:</label>
					<input
						name="capacity"
						value={newVenue.capacity}
						className="venue-max-capacity text-center bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						placeholder="Max Capacity"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset className="edit-venue-fieldset my-3 relative">
					<label className="mx-2 absolute text-lg top-0 left-0 right-0 text-center">
						About Section
					</label>
					<textarea
						name="about_section"
						value={newVenue.about_section}
						className="venue-about-section mt-8 text-center w-[600px] h-[300px] bg-slate-200 px-2 py-1 rounded-lg border-black border-2 hover:bg-slate-300"
						type="textarea"
						placeholder="About Section"
						onChange={handleInputChange}
					/>
				</fieldset>
				<fieldset>
					<button
						type="submit"
						className="venue-submit-button bg-amber-600 py-1 px-2 text-lg placeholder:text-center
					placeholder:text-gray-600 rounded-lg hover:cursor-pointer 
					text-center border-black border-2 hover:bg-amber-400 duration-200 delay-50"
						onClick={handleSubmit}>
						Add Venue
					</button>
				</fieldset>
			</form>
		</div>
	)
}

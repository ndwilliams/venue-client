import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getVenueById } from "../../managers/VenueManager"

export const VenueDetails = () => {
	const [chosenVenue, setChosenVenue] = useState({})
	const { venueId } = useParams()

	const fetchAndSetVenue = () => {
		getVenueById(venueId).then((venueObj) => setChosenVenue(venueObj))
	}

	useEffect(() => {
		fetchAndSetVenue()
	}, [])

	return (
		<div>
			<section
				className="mx-auto w-1/2 text-center font-sans text-lg content-center
       my-10 bg-blue-400 bg-opacity-80 rounded-3xl">
				<div className="venue-name">{chosenVenue.name}</div>
				<div className="venue-address">{chosenVenue.address}</div>
				<div className="venue-capacity">
					<span className="capacity-indicator">Max Capacity: </span>
					{chosenVenue.capacity}
				</div>
				<div className="about-section">
					<span className="about-section-indicator">About This Venue: </span>
					{chosenVenue.about_section}
				</div>
			</section>
		</div>
	)
}

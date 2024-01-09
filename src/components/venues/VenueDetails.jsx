import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getVenueById } from "../../managers/VenueManager"

export const VenueDetails = ({ currentUser }) => {
	const [chosenVenue, setChosenVenue] = useState({})
	const { venueId } = useParams()
	const navigate = useNavigate()

	const fetchAndSetVenue = () => {
		getVenueById(venueId, currentUser).then((venueObj) =>
			setChosenVenue(venueObj)
		)
	}

	useEffect(() => {
		fetchAndSetVenue()
	}, [])

	return (
		<div>
			<section
				className="mx-auto w-1/2 text-center font-sans text-lg content-center
       my-10 bg-blue-400 bg-opacity-90 rounded-3xl border-black border-4">
				<div className="venue-name text-3xl my-2 px-2">{chosenVenue.name}</div>
				<div className="venue-address text-xl my-2">{chosenVenue.address}</div>
				<div className="venue-capacity text-xl my-2">
					<span className="capacity-indicator font-semibold">
						Max Capacity:{" "}
					</span>
					{chosenVenue.capacity}
				</div>
				<div className="about-section my-2">
					<span className="about-section-indicator font-semibold">
						About This Venue:{" "}
					</span>
					{chosenVenue.about_section}
				</div>
				{currentUser.is_staff === true ? (
					<div className="edit-venue-button-container">
						<button
							className="edit-venue-button bg-slate-300
							hover:cursor-pointer hover:bg-slate-400 
							duration-300 py-2 px-4 font-medium rounded-lg 
							border-2 border-slate-600 my-2"
							onClick={() => {
								navigate(`/venues/${venueId}/edit`)
							}}>
							Edit Venue
						</button>
					</div>
				) : (
					""
				)}
			</section>
		</div>
	)
}

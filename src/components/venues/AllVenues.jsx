import { useEffect, useState } from "react"
import { getAllVenues } from "../../managers/VenueManager"
import { useNavigate } from "react-router-dom"

export const AllVenues = ({ currentUser }) => {
	const [allVenues, setAllVenues] = useState([])
	const navigate = useNavigate()

	const fetchAndSetAllVenues = () => {
		getAllVenues(currentUser).then((venuesArray) => setAllVenues(venuesArray))
	}

	useEffect(() => {
		fetchAndSetAllVenues()
	}, [])

	return (
		<div className="all-venues-container">
			<div className="flex justify-center">
				{currentUser.is_staff === true ? (
					<button
						className="add-venue-button my-4 text-center shadow-lg
						 border-4 bg-white/90 outline-1 text-2xl px-4 py-4
						 border-black rounded-lg opacity-90 transition-color
						 hover:bg-white/90 hover:opacity-100 duration-200 delay-50"
						onClick={() => {
							navigate(`/addVenue`)
						}}>
						Add Venue
					</button>
				) : (
					""
				)}
			</div>
			<div className="venues-container flex flex-wrap justify-evenly my-4">
				{allVenues.map((venue) => {
					return (
						<div
							key={venue.id}
							className="w-[550px] h-[400px] bg-amber-500 bg-opacity-90 scale-[.9]
							border-black border-[6px] rounded-2xl mx-5 my-6 overflow-hidden hover:scale-[1]
							transition-transform duration-500 hover:cursor-pointer"
							onClick={() => {
								navigate(`/venues/${venue.id}`)
							}}>
							<div className="venue-image-container relative h-[60%]">
								<div className="venue-name px-5 py-3 text-center font-semibold text-2xl">
									{venue.name}
								</div>
								<div className="venue-image-container absolute">
									<img
										className="object-cover w-full h-full"
										src={venue.venue_outside_image_url}
										alt={venue.name}
									/>
									<div
										className="hover-image absolute top-0 left-0 opacity-0 hover:opacity-100
									transition-opacity duration-[2000ms]">
										<img
											className="object-cover w-full h-full"
											src={venue.venue_inside_image_url}
											alt={venue.name}
										/>
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

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
		<div className="py-3">
			<h2
				className="bg-zinc-400 bg-opacity-80 m-auto max-w-min
             rounded-md text-center text-3xl font-sans underline font-extrabold">
				All Venues
			</h2>
			{currentUser.is_staff === true ? (
				<div
					className="add-venue-button"
					onClick={() => {
						navigate(`/addVenue`)
					}}>
					Add Venue
				</div>
			) : (
				""
			)}

			<article className="">
				{allVenues.map((venue) => {
					return (
						<section
							key={venue.id}
							className="flex justify-between p-5 mx-8 my-5 border-4 scale-100
                    bg-green-100 bg-opacity-90 border-green-500 rounded-xl
                    hover:scale-110 transition-transform duration-300"
							onClick={() => {
								navigate(`/venues/${venue.id}`)
							}}>
							<div className="venue-name">{venue.name}</div>
							<div className="venue-image-container relative">
								<img
									className="object-fill"
									src={venue.venue_outside_image_url}
									alt={venue.name}
								/>
								<div
									className="hover-image absolute top-0 left-0 opacity-0 
                                hover:opacity-100 transition-opacity duration-[2000ms]">
									<img
										className="object-cover"
										src={venue.venue_inside_image_url}
										alt={venue.name}
									/>
								</div>
							</div>
						</section>
					)
				})}
			</article>
		</div>
	)
}

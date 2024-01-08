export const FilterConcertsByVenue = ({ setSelectedVenue, allVenues }) => {
	return (
		<div className="flex justify-between mx-20 my-4">
			<select
				id="venues"
				className="text-center text-xl w-48 border-2 border-red-400 rounded-xl"
				onChange={(event) => {
					setSelectedVenue(event.target.value)
				}}>
				<option value={0}>Filter By Venue</option>
				{allVenues.map((venueObj) => {
					return (
						<option key={venueObj.id} value={venueObj.id}>
							{venueObj.name}
						</option>
					)
				})}
			</select>
		</div>
	)
}

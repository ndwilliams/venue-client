export const FilterConcertsByVenue = ({ setSelectedVenue, allVenues }) => {
	return (
		<div className="flex justify-between mx-20 my-4">
			<select
				id="venues"
				className="text-center bg-amber-600 outline-1 text-lg px-3 py-1 border-black border-2 rounded-lg transition-color hover:bg-amber-400 duration-200 delay-50"
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

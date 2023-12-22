import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getConcertById } from "../../managers/ConcertManager"
import { formatDate, formatHour } from "../../utils/FormatDateTime"

export const ConcertDetails = () => {
	const [chosenConcert, setChosenConcert] = useState({})
	const { concertId } = useParams()

	const fetchAndSetConcert = () => {
		getConcertById(concertId).then((concertObj) => setChosenConcert(concertObj))
	}

	useEffect(() => {
		fetchAndSetConcert()
	}, [])

	return (
		<section
			key={chosenConcert.id}
			className="mx-auto w-1/2 text-center font-sans text-lg content-center
        my-10 bg-blue-400 bg-opacity-80 rounded-3xl">
			<div className="headlining-band p-1">{chosenConcert.band?.name}</div>
			<div className="opening-bands p-0.5">
				With:
				{chosenConcert.opening_bands?.map((openerObj) => {
					return (
						<div key={openerObj.id} className="opener-name p-0.5">
							{openerObj.name}
						</div>
					)
				})}
				<div className="venue-name p-1">At: {chosenConcert.venue?.name}</div>
				<div className="concert-date p-1">
					{formatDate(chosenConcert.show_starts)}
				</div>
				<div className="doors-open-time p-1">
					<span>Doors Open: </span>
					{formatHour(chosenConcert.doors_open)}
				</div>
				<div className="concert-start-time p-1">
					<span>Show Starts: </span>
					{formatHour(chosenConcert.show_starts)}
				</div>
			</div>
		</section>
	)
}

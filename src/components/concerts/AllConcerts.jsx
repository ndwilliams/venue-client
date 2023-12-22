import { useEffect, useState } from "react"
import { getAllConcerts } from "../../managers/ConcertManager"
import { useNavigate } from "react-router-dom"

export const AllConcerts = () => {
	const [allConcerts, setAllConcerts] = useState([])
	const navigate = useNavigate()

	const fetchAndSetAllConcerts = () => {
		getAllConcerts().then((concertArray) => setAllConcerts(concertArray))
	}

	useEffect(() => {
		fetchAndSetAllConcerts()
	}, [])

	const formatDateTime = (dateTimeString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		}
		const formattedDate = new Date(dateTimeString).toLocaleDateString(
			"en-US",
			options
		)
		return formattedDate
	}

	return (
		<div className="py-3">
			<h2
				className="bg-zinc-400 bg-opacity-80 m-auto max-w-min
             rounded-md text-center text-3xl font-sans underline font-extrabold">
				All Concerts
			</h2>
			<article className="">
				{allConcerts.map((concert) => {
					return (
						<section
							key={concert.id}
							className="flex justify-between p-5 mx-8 my-5 border-4 scale-100
                            bg-green-100 bg-opacity-90 border-green-500 rounded-xl
                            hover:scale-110 transition-transform duration-300"
							onClick={() => {
								navigate(`/${concert.id}`)
							}}>
							<div className="pt-1.5">{concert.band.name}</div>
							<div className="pt-2">{concert.venue.name}</div>
							<div className="pt-2">{formatDateTime(concert.show_starts)}</div>
							<div className=""></div>
						</section>
					)
				})}
			</article>
		</div>
	)
}

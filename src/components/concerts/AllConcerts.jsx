import { useEffect, useState } from "react"
import { getAllConcerts } from "../../managers/ConcertManager"

export const AllConcerts = () => {
	const [allConcerts, setAllConcerts] = useState([])

	const fetchAndSetAllConcerts = () => {
		getAllConcerts().then((concertArray) => setAllConcerts(concertArray))
	}

	useEffect(() => {
		fetchAndSetAllConcerts()
	}, [])

	return <>All Concerts</>
}

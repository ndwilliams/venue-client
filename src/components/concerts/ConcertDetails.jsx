import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getConcertById } from "../../managers/ConcertManager"

export const ConcertDetails = () => {
	const [chosenConcert, setChosenConcert] = useState({})
	const { concertId } = useParams()

	const fetchAndSetConcert = () => {
		getConcertById(concertId).then((concertObj) => setChosenConcert(concertObj))
	}

	useEffect(() => {
		fetchAndSetConcert()
	}, [])

	return <>Butts</>
}

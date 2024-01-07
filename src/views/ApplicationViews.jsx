import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllConcerts } from "../components/concerts/AllConcerts"
import { ConcertDetails } from "../components/concerts/ConcertDetails"
import { AllVenues } from "../components/venues/AllVenues"
import { VenueDetails } from "../components/venues/VenueDetails"
import { ViewProfile } from "../components/profile/ViewProfile"
import { FavoriteConcerts } from "../components/favorites/FavoriteConcerts"
import { AddConcertForm } from "../components/concerts/AddConcertForm"
import { EditVenue } from "../components/venues/EditVenue"
import { EditConcert } from "../components/concerts/EditConcert"
import { AddVenue } from "../components/venues/AddVenue"

export const ApplicationViews = ({ currentUser, setUser }) => {
	return (
		<>
			<Routes>
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/register" element={<Register setUser={setUser} />} />
				<Route element={<Authorized currentUser={currentUser} />}>
					<Route path="/" element={<AllConcerts currentUser={currentUser} />} />
					<Route path="/addConcert" element={<AddConcertForm />} />
					<Route
						path="/:concertId"
						element={<ConcertDetails currentUser={currentUser} />}
					/>
					<Route
						path="/:concertId/edit"
						element={<EditConcert currentUser={currentUser} />}
					/>
					<Route
						path="/venues/"
						element={<AllVenues currentUser={currentUser} />}
					/>
					<Route path="/addVenue" element={<AddVenue />} />
					<Route
						path="/venues/:venueId"
						element={<VenueDetails currentUser={currentUser} />}
					/>
					<Route path="/venues/:venueId/edit" element={<EditVenue />} />
					<Route
						path="/myprofile"
						element={<ViewProfile currentUser={currentUser} />}
					/>
					<Route
						path="/favoriteconcerts"
						element={<FavoriteConcerts currentUser={currentUser} />}
					/>
				</Route>
			</Routes>
		</>
	)
}

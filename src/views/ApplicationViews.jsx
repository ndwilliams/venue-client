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

export const ApplicationViews = ({
	token,
	setToken,
	userId,
	setCurrentUserId,
	is_staff,
	setAdminStatus,
}) => {
	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<Login
							setToken={setToken}
							setCurrentUserId={setCurrentUserId}
							setAdminStatus={setAdminStatus}
						/>
					}
				/>
				<Route
					path="/register"
					element={
						<Register
							setToken={setToken}
							setCurrentUserId={setCurrentUserId}
							setAdminStatus={setAdminStatus}
						/>
					}
				/>
				<Route
					path="/"
					element={
						<Authorized
							token={token}
							setToken={setToken}
							userId={userId}
							is_staff={is_staff}
						/>
					}>
					<Route
						index
						element={<AllConcerts userId={userId} token={token} />}
					/>
					<Route path="/addConcert" element={<AddConcertForm />} />
					<Route
						path="/:concertId"
						element={<ConcertDetails userId={userId} token={token} />}
					/>
					<Route path="/:concertId/edit" element={<EditConcert />} />
					<Route
						path="/venues/"
						element={<AllVenues userId={userId} token={token} />}
					/>
					<Route path="/addVenue" element={<AddVenue />} />
					<Route
						path="/venues/:venueId"
						element={<VenueDetails userId={userId} token={token} />}
					/>
					<Route path="/venues/:venueId/edit" element={<EditVenue />} />
					<Route
						path="/myprofile"
						element={<ViewProfile userId={userId} token={token} />}
					/>
					<Route
						path="/favoriteconcerts"
						element={<FavoriteConcerts userId={userId} token={token} />}
					/>
				</Route>
			</Routes>
		</>
	)
}

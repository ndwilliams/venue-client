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

export const ApplicationViews = ({
	token,
	setToken,
	userId,
	setCurrentUserId,
}) => {
	return (
		<>
			<Routes>
				<Route
					path="/login"
					element={
						<Login setToken={setToken} setCurrentUserId={setCurrentUserId} />
					}
				/>
				<Route
					path="/register"
					element={
						<Register setToken={setToken} setCurrentUserId={setCurrentUserId} />
					}
				/>
				<Route
					path="/"
					element={
						<Authorized token={token} setToken={setToken} userId={userId} />
					}>
					<Route
						index
						element={<AllConcerts userId={userId} token={token} />}
					/>
					<Route
						path="/:concertId"
						element={<ConcertDetails userId={userId} token={token} />}
					/>
					<Route
						path="/venues/"
						element={<AllVenues userId={userId} token={token} />}
					/>
					<Route
						path="/venues/:venueId"
						element={<VenueDetails userId={userId} token={token} />}
					/>
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

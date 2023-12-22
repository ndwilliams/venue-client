import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { AllConcerts } from "../components/concerts/AllConcerts"
import { ConcertDetails } from "../components/concerts/ConcertDetails"
import { AllVenues } from "../components/venues/AllVenues"
import { VenueDetails } from "../components/venues/VenueDetails"

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
					<Route index element={<AllConcerts />} />
					<Route path="/:concertId" element={<ConcertDetails />} />
					<Route path="/venues/" element={<AllVenues />} />
					<Route path="/venues/:venueId" element={<VenueDetails />} />
				</Route>
			</Routes>
		</>
	)
}

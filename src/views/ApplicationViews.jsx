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
	currentUser,
	setUser,
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
							setUser={setUser}
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
							setUser={setUser}
						/>
					}
				/>
				<Route
					element={
						<Authorized
							token={token}
							setToken={setToken}
							userId={userId}
							setCurrentUserId={setCurrentUserId}
							setAdminStatus={setAdminStatus}
							is_staff={is_staff}
							currentUser={currentUser}
						/>
					}>
					<Route
						path="/"
						element={
							<AllConcerts
								userId={userId}
								token={token}
								is_staff={is_staff}
								setCurrentUserId={setCurrentUserId}
								setAdminStatus={setAdminStatus}
								currentUser={currentUser}
							/>
						}
					/>
					<Route path="/addConcert" element={<AddConcertForm />} />
					<Route
						path="/:concertId"
						element={
							<ConcertDetails
								userId={userId}
								token={token}
								is_staff={is_staff}
								currentUser={currentUser}
							/>
						}
					/>
					<Route path="/:concertId/edit" element={<EditConcert />} />
					<Route
						path="/venues/"
						element={
							<AllVenues
								userId={userId}
								token={token}
								is_staff={is_staff}
								currentUser={currentUser}
							/>
						}
					/>
					<Route path="/addVenue" element={<AddVenue />} />
					<Route
						path="/venues/:venueId"
						element={
							<VenueDetails
								userId={userId}
								token={token}
								is_staff={is_staff}
								currentUser={currentUser}
							/>
						}
					/>
					<Route path="/venues/:venueId/edit" element={<EditVenue />} />
					<Route
						path="/myprofile"
						element={
							<ViewProfile
								userId={userId}
								token={token}
								is_staff={is_staff}
								currentUser={currentUser}
							/>
						}
					/>
					<Route
						path="/favoriteconcerts"
						element={
							<FavoriteConcerts
								userId={userId}
								token={token}
								is_staff={is_staff}
								currentUser={currentUser}
							/>
						}
					/>
				</Route>
			</Routes>
		</>
	)
}

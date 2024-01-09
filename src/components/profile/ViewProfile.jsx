import { useEffect, useState } from "react"
import { getCurrentUserProfile } from "../../managers/ProfileManager"
import { ProfileDetails } from "./ProfileDetails"
import { EditProfile } from "./EditProfile"

export const ViewProfile = ({ currentUser }) => {
	const [Editing, setEditing] = useState(false)
	const [myProfile, setMyProfile] = useState({})

	const fetchAndSetMyProfile = () => {
		getCurrentUserProfile().then((profileObj) => setMyProfile(profileObj))
	}

	useEffect(() => {
		fetchAndSetMyProfile()
	}, [Editing])

	return (
		<div className="bg-blue-400 mx-auto content-center text-center w-1/3 opacity-90 my-10 rounded-2xl border-black border-4 shadow-xl">
			{Editing ? (
				<EditProfile
					myProfile={myProfile}
					currentUser={currentUser}
					Editing={Editing}
					setEditing={setEditing}
					fetchAndSetMyProfile={fetchAndSetMyProfile}
				/>
			) : (
				<ProfileDetails
					currentUser={currentUser}
					myProfile={myProfile}
					Editing={Editing}
					setEditing={setEditing}
				/>
			)}
		</div>
	)
}

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
		<>
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
		</>
	)
}

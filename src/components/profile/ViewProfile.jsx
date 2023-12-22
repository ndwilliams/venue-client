import { useEffect, useState } from "react"
import { getProfileByUserId } from "../../managers/ProfileManager"
import { ProfileDetails } from "./ProfileDetails"
import { EditProfile } from "./EditProfile"

export const ViewProfile = ({ userId, token }) => {
	const [Editing, setEditing] = useState(false)
	const [myProfile, setMyProfile] = useState({})

	const fetchAndSetMyProfile = () => {
		getProfileByUserId(userId, token).then((profileObj) =>
			setMyProfile(profileObj)
		)
	}

	useEffect(() => {
		fetchAndSetMyProfile()
	}, [])

	return (
		<>
			{Editing ? (
				<EditProfile
					myProfile={myProfile}
					userId={userId}
					token={token}
					Editing={Editing}
					setEditing={setEditing}
				/>
			) : (
				<ProfileDetails
					userId={userId}
					token={token}
					myProfile={myProfile}
					Editing={Editing}
					setEditing={setEditing}
				/>
			)}
		</>
	)
}

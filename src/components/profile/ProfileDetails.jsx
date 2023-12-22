export const ProfileDetails = ({ myProfile, setEditing }) => {
	return (
		<div className="profile-container">
			<section className="profile-card">
				<div className="first-name">
					Name: {myProfile.first_name}
					<span className="last-name"> {myProfile.last_name}</span>
				</div>
				<div className="email">
					<span className="email-indicator">Email: </span>
					{myProfile.email}
				</div>
				<div className="username">
					<span className="username-indicator">Username: </span>
					{myProfile.username}
				</div>
				<div className="user-type">
					{myProfile.is_staff ? (
						<div className="admin">Admin</div>
					) : (
						<div className="concert-goer">Concert Goer</div>
					)}
				</div>
			</section>
			<button
				className="edit-profile-button"
				onClick={() => {
					setEditing(true)
				}}>
				Edit Profile
			</button>
		</div>
	)
}
